import { I18N_CONFIG } from '@/shared/config/i18n'
import type { Locale } from '@/shared/types'

type DefaultValueArgs = { locale?: Locale; req: unknown; user: unknown }

type RichTextState = {
  root: {
    type: string
    direction: 'ltr'
    format: ''
    indent: number
    version: number
    children: unknown[]
  }
}

const DEFAULT_LOCALE = I18N_CONFIG.defaultLocale as Locale

/**
 * Creates Lexical richText state from heading and paragraph text
 */
export function createRichTextState(heading: string, paragraph: string): RichTextState {
  return {
    root: {
      type: 'root',
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'heading',
          tag: 'h2',
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'text',
              text: heading,
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              version: 1,
            },
          ],
        },
        {
          type: 'paragraph',
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
          children: [
            {
              type: 'text',
              text: paragraph,
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              version: 1,
            },
          ],
        },
      ],
    },
  }
}

/**
 * Creates localized defaultValue function for simple fields (text, number, etc.)
 *
 * @example
 * defaultValue: createLocalizedDefault({ en: 'Hello', es: 'Hola' })
 */
export function createLocalizedDefault<T>(
  translations: Record<Locale, T>,
): (args: DefaultValueArgs) => T {
  const fallback = translations[DEFAULT_LOCALE] ?? (Object.values(translations)[0] as T)

  return (args) => {
    const locale = args.locale ?? DEFAULT_LOCALE
    return structuredClone(translations[locale] ?? fallback)
  }
}

/**
 * Creates localized defaultValue function for richText fields
 * Automatically converts { heading, paragraph } to Lexical state
 *
 * @example
 * defaultValue: createLocalizedRichText({
 *   en: { heading: 'Title', paragraph: 'Content' },
 *   es: { heading: 'Título', paragraph: 'Contenido' }
 * })
 */
export function createLocalizedRichText(translations: {
  [K in Locale]: { heading: string; paragraph: string }
}): (args: DefaultValueArgs) => RichTextState {
  const richTextRecord = {} as Record<Locale, RichTextState>

  for (const { code } of I18N_CONFIG.locales) {
    const locale = code as Locale
    const t = translations[locale]
    if (t) {
      richTextRecord[locale] = createRichTextState(t.heading, t.paragraph)
    }
  }

  return createLocalizedDefault(richTextRecord)
}
