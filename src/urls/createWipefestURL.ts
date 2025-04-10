export function createWipefestURL(code: string, fight: string | null | undefined) {
  let base = `https://www.wipefest.gg/report/${code}`

  if (fight) {
    base += `/fight/${fight}`
  }

  return `${base}?gameVersion=warcraft-live`
}