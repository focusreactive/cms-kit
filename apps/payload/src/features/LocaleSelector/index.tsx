import React from 'react'
import { DropdownMenu, Link } from '@/shared/ui'
import { I18N_CONFIG } from '@/shared/config/i18n'
import { useLocale } from 'next-intl'
import { cn } from '@/shared/lib/utils'
import { usePathname } from '@/i18n/navigation'

type Props = {
  render: (locale: (typeof I18N_CONFIG.locales)[number]['label']) => React.ReactNode
}

export const LocaleSelector = ({ render }: Props) => {
  const locale = useLocale()
  const pathname = usePathname()

  if (I18N_CONFIG.locales.length === 1) {
    return null
  }

  const currentLocale = I18N_CONFIG.locales.find((l) => l.code === locale)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{render(currentLocale?.label as string)}</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          {I18N_CONFIG.locales.map((l) => (
            <Link
              key={l.code}
              href={pathname}
              locale={l.code}
              className={cn(
                l.code === locale ? 'text-muted-foreground pointer-events-none cursor-default' : '',
              )}
              aria-disabled={l.code === locale}
            >
              <DropdownMenu.Item className="cursor-pointer">{l.label}</DropdownMenu.Item>
            </Link>
          ))}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
