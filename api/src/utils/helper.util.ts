export function isValidUUID(uuid: string): boolean {
  const uuidRegexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
  return uuidRegexExp.test(uuid)
}

// Turns an Accept-Language header into the viewer's languages as ISO 639-1 codes, most
// preferred first. English is always included since the app itself is English-only, so
// anyone using it can at least follow an English-language movie.
export function parseAcceptLanguage(header: string | undefined): string[] {
  const languages = (header || '')
    .split(',')
    .map(part => {
      const [tag, ...params] = part.trim().split(';')
      const q = params.find(p => p.trim().startsWith('q='))
      return { code: tag.trim().split('-')[0].toLowerCase(), q: q ? parseFloat(q.trim().slice(2)) : 1 }
    })
    .filter(({ code, q }) => /^[a-z]{2}$/.test(code) && q > 0)
    .sort((a, b) => b.q - a.q)
    .map(({ code }) => code)

  return [...new Set([...languages, 'en'])]
}
