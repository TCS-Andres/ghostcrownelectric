/*
  Title Case for section headings.

  Applied centrally in SectionHeading so every section title across the site
  renders in Title Case without rewriting each string. Rules:
  - Minor words (articles, coordinating conjunctions, short prepositions) stay
    lowercase unless they are the first or last word.
  - Tokens that already carry an uppercase letter (acronyms and place casing like
    FL, EV, GFCI, LED, NEC) are left untouched, so nothing gets mangled.
  - Hyphenated compounds are cased on each part ("whole-home" -> "Whole-Home").
  It is idempotent: running it on an already Title Cased string is a no-op.
*/

const MINOR_WORDS = new Set([
  "a","an","and","as","at","but","by","for","from","in","nor","of","on","or",
  "the","to","with",
]);

function capWord(word: string): string {
  if (!word) return word;
  // Preserve acronyms / intentional casing (FL, EV, GFCI, iPhone, ...).
  if (word === word.toUpperCase() || /[A-Z]/.test(word.slice(1))) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function capToken(token: string): string {
  return token.split("-").map(capWord).join("-");
}

export function titleCase(input: string): string {
  const tokens = input.split(" ");
  const lastIndex = tokens.length - 1;
  return tokens
    .map((token, index) => {
      if (!token) return token;
      const bare = token.toLowerCase().replace(/[^a-z]/g, "");
      if (MINOR_WORDS.has(bare) && index !== 0 && index !== lastIndex) {
        return token.toLowerCase();
      }
      return capToken(token);
    })
    .join(" ");
}
