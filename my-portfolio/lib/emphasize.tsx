/**
 * Splits a sentence on a list of keywords and wraps each match in <b>, so the
 * copy stays a plain string in the data file while the UI still highlights
 * the important words.
 */
export function emphasize(text: string, highlights: readonly string[]): (string | JSX.Element)[] {
  if (highlights.length === 0) return [text]

  const escaped = highlights
    .filter((word) => word.trim().length > 0)
    .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .sort((a, b) => b.length - a.length)

  if (escaped.length === 0) return [text]

  const pattern = new RegExp(`(${escaped.join("|")})`, "gi")
  const nodes: (string | JSX.Element)[] = []
  let lastIndex = 0
  let match = pattern.exec(text)

  while (match !== null) {
    const index = match.index
    if (index > lastIndex) nodes.push(text.slice(lastIndex, index))
    nodes.push(<b key={`${match[0]}-${index}`}>{match[0]}</b>)
    lastIndex = index + match[0].length
    match = pattern.exec(text)
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))

  return nodes
}
