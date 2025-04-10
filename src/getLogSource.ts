export function getLogSource() {
  const sourceText = document.querySelector('#filter-source-text')

  if (sourceText?.textContent === 'All Friendles') return null

  const nameWrapper = sourceText?.querySelector('span')
  const nameNode = Array.from(nameWrapper?.childNodes || []).find(c => {
    return c.nodeName === '#text' && !!c.textContent?.trim().length
  })
  
  if (nameNode && nameNode.textContent?.length) {
    return nameNode.textContent
  }

  return null
}