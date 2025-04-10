import {getLogSource} from '../getLogSource'

export function createAnalyzerURL(code: string, fight?: string | null) {
  let base = `https://www.wowanalyzer.com/report/${code}`
  const player = getLogSource()

  if (player && fight) {
    const content = fightContent(fight)
  
    if (content) {
      base += `/${content}/${player}/standard/overview`
    }

  } if (!player && fight) {
    base += `/${fight}`
  }

  return base
}

function fightContent(fight: string) {
  const bossContentEl = document.querySelector('#filter-fight-boss-contents')
  const bossTextEl = bossContentEl?.querySelector('#filter-fight-boss-text')

  const bossName = Array.from(bossTextEl?.childNodes || []).find(c => {
    return c.nodeName === '#text' && !!c.textContent?.trim().length
  })
  const matched = bossName?.textContent?.match(/(.*)(Normal|Mythic|Heroic)/) || []

  if (matched.length) {
    const boss = matched[1].trim().replace(/\s/gim, '+')
    const difficulty = matched[2]

    const fightDetailsEl = bossContentEl?.querySelector('#filter-fight-details-text')
    const fightDetailWrapper = childrenMatches(fightDetailsEl, 'span')

    if (fightDetailWrapper.length) {
      const wrapper = fightDetailWrapper[0]
      const fightName = getTextChildren(wrapper)[0]?.textContent?.trim().replace(/\s/gim, '+')
      const duration = wrapper.querySelector('.fight-duration')?.textContent?.trim()

      if (fightName && duration) {
        return `${fight}-${difficulty}+${boss}+-+${fightName}+${duration}`
      }
    }
  }

  return null
}

const childrenMatches = function (elem: Element | null | undefined, selector: string): Element[] {
  if (!elem) return []
  return Array.from(elem.children).filter(child => {
    return child.matches(selector)
  })
};

const getTextChildren = function(elem: Element | null | undefined) {
  if (!elem) return []
  return Array.from(elem.childNodes).filter(child => {
    return child.nodeName === '#text' && !!child.textContent?.trim().length
  })
}