export function setStyle(el: HTMLElement, styles: Partial<CSSStyleDeclaration>) {
  Object.entries(styles).forEach(([k, v]) => {
    const key = k
    el.style[key] = v
  })
}