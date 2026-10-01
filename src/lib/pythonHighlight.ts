/**
 * A tiny Python syntax highlighter for read-only code (visualizer, snippets).
 * Monaco is used wherever code is editable; this keeps static code light.
 */
const KEYWORDS = new Set(
  (
    "False None True and as assert async await break class continue def del elif else except " +
    "finally for from global if import in is lambda nonlocal not or pass raise return try while with yield match case"
  ).split(" "),
);
const BUILTINS = new Set(
  (
    "abs all any bin bool chr dict divmod enumerate filter float hash int isinstance iter len list " +
    "map max min next object ord pow print range repr reversed round set sorted str sum tuple type zip " +
    "self heapq deque defaultdict Counter collections math bisect functools cache lru_cache inf"
  ).split(" "),
);

export type TokenKind = "kw" | "str" | "num" | "com" | "fn" | "builtin" | "text";
export interface Token {
  kind: TokenKind;
  text: string;
}

const TOKEN_RE =
  /(#[^\n]*)|([rbfu]{0,2}"""[\s\S]*?"""|[rbfu]{0,2}'''[\s\S]*?'''|[rbfu]{0,2}"(?:\\.|[^"\\\n])*"|[rbfu]{0,2}'(?:\\.|[^'\\\n])*')|(\b\d[\d_]*(?:\.\d+)?(?:e[+-]?\d+)?\b)|([A-Za-z_][A-Za-z0-9_]*)/gi;

/** Tokenizes one line (multi-line strings are rare in our snippets; they're colored per line). */
export function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  for (const m of line.matchAll(TOKEN_RE)) {
    const idx = m.index ?? 0;
    if (idx > last) tokens.push({ kind: "text", text: line.slice(last, idx) });
    const [text, com, str, num, word] = m;
    if (com) tokens.push({ kind: "com", text });
    else if (str) tokens.push({ kind: "str", text });
    else if (num) tokens.push({ kind: "num", text });
    else if (word) {
      const after = line.slice(idx + text.length);
      if (KEYWORDS.has(word)) tokens.push({ kind: "kw", text });
      else if (BUILTINS.has(word)) tokens.push({ kind: "builtin", text });
      else if (/^\s*\(/.test(after)) tokens.push({ kind: "fn", text });
      else tokens.push({ kind: "text", text });
    }
    last = idx + text.length;
  }
  if (last < line.length) tokens.push({ kind: "text", text: line.slice(last) });
  return tokens;
}
