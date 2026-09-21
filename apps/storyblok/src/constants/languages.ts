// Mirrors the Storyblok space's `languages` setting — keep in sync.
// Allowlist, not a pattern match: the space has folders named `cn` and `congo`.
export const SB_LANGUAGES: readonly string[] = ["fr"];

// Storyblok preview URLs are {domain}/{language}/{slug}, but the space translates
// fields, not slugs, so the language must travel as the `language` query param.
export function splitLanguageFromSlug(slug?: string[]): {
  language?: string;
  slug?: string[];
} {
  const [first, ...rest] = slug ?? [];

  if (!first || !SB_LANGUAGES.includes(first)) {
    return { slug };
  }

  // undefined, not []: `fetchStory` falls back to "home" only on a falsy slug, and
  // an empty path segment hits the delivery API's list endpoint instead of a story.
  return { language: first, slug: rest.length > 0 ? rest : undefined };
}
