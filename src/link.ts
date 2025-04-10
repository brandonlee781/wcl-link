import {setStyle} from './setStyle'

export function createLink(content: any, options: CreateLinkOptions) {
  const link = document.createElement('a')

  link.id = options.id
  link.href = options.href
  link.target = '_blank'

  setStyle(link, options.style)

  link.appendChild(content)

  return link
}

export type CreateLinkOptions = {
  id: string
  href: string
  style: Partial<CSSStyleDeclaration>
}