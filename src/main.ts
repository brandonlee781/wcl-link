// @ts-ignore isolatedModules
import { createLink } from './link'
import {setStyle} from './setStyle'

const linkStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

function main() {
  const url = window.location
  const codeRegex = new RegExp(/\/reports\/([^?\/]+)(?:.*?[?&]fight=(\d+))?/im)
  const matched = url.href.match(codeRegex) || []
  const wipefestLogo = 'https://www.wipefest.gg/logo-circle.84ad348907354f755c3f.png'
  const wowanalyzerLogo = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.4842 102.243L1.02185 84.2455L49.9996 -7.62939e-06L98.9777 84.2461L88.5199 102.236L87.2159 99.9931H62.5V81.9943H76.7519L50.0041 35.986L23.2562 81.9943H37.5V99.9931H12.7923L11.4842 102.243ZM106.771 99.9931H106.809V99.9271L106.771 99.9931Z" fill="var(--main, #FAB700)"></path><path d="M12.7883 100H86L85.9971 99.9931H62.5V81.9943H76.7519L50.0041 35.986L23.2562 81.9943H37.5V99.9931H12.7923L12.7883 100Z" fill="var(--arrow, transparent)"></path></svg>
  `
  
	if (matched.length > 1) {
  	const code = matched[1]
    const fight = matched[2] || null
    const reportBar = document.querySelector('.report-bar-top-right-section')
    const wowAnalyzerUrl = `https://www.wowanalyzer.com/report/${code}${fight ? `/${fight}` : ''}`
    const wipefestUrl = `https://www.wipefest.gg/report/${code}${fight ? `/fight/${fight}` : ''}?gameVersion=warcraft-live`
    
    const parser = new DOMParser()
    const doc = parser.parseFromString(wowanalyzerLogo, 'image/svg+xml')
    const svg = doc.documentElement
    setStyle(svg, { height: '2.1em', width: 'auto' })
    
    const wfImg = document.createElement('img')
    wfImg.src = wipefestLogo
    setStyle(wfImg, { height: '2.1em', width: 'auto' })

    const waLink = createLink(svg, {
      id: 'wa-link',
      href: wowAnalyzerUrl,
      style: linkStyle
    })
    const wfLink = createLink(wfImg, {
      id: 'wf-link',
      href: wipefestUrl,
      style: linkStyle
    })
    
    if (reportBar) {
      reportBar.prepend(waLink)
      reportBar.prepend(wfLink)
    }
  }
}

let previousUrl = '';
const observer = new MutationObserver(function() {
  if (location.href !== previousUrl) {
      previousUrl = location.href;
    	document.getElementById('wa-link')?.remove()
    	document.getElementById('wf-link')?.remove()
      main()
    }
});
const config = {subtree: true, childList: true};
observer.observe(document, config);