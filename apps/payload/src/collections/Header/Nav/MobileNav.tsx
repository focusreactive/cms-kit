import React from 'react'
import { Menu, ChevronRight } from 'lucide-react'
import { CMSLink, Link } from '@/shared/ui'
import { Button, Sheet } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import type { Header as HeaderType } from '@/payload-types'
import { LocaleSelector } from '@/features/LocaleSelector'

export const MobileNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <div className="flex md:hidden">
      <Sheet.Root>
        <Sheet.Trigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation menu"
            className="relative z-50 hover:bg-accent/80 transition-colors"
          >
            <Menu className="size-6" aria-hidden="true" />
          </Button>
        </Sheet.Trigger>
        <Sheet.Content className="flex md:hidden flex-col h-full p-0 border-l-0 bg-linear-to-b from-background to-accent/20">
          <Sheet.Header className="px-6 pt-6 pb-4 border-b border-border/50">
            <Sheet.Title className="text-left mb-0 text-xl tracking-tight">Navigation</Sheet.Title>
          </Sheet.Header>

          <nav aria-label="Main navigation" className="w-full flex-1 overflow-y-auto min-h-0 px-4">
            <ul className="flex flex-col gap-1" role="list">
              {navItems.map((item, index) => {
                if (item.type === 'link') {
                  return (
                    <li key={item.id}>
                      <Sheet.Close asChild>
                        <CMSLink
                          {...item.link}
                          appearance="inline"
                          className={cn(
                            'flex items-center justify-between py-3 px-3 rounded-lg',
                            'text-base font-medium no-underline',
                            'hover:bg-accent transition-all duration-200',
                            'group',
                          )}
                        >
                          <ChevronRight
                            className="size-4 opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0 transition-all duration-200"
                            aria-hidden
                          />
                        </CMSLink>
                      </Sheet.Close>
                    </li>
                  )
                }

                const groupId = `nav-group-${item.id}`

                return (
                  <li key={item.id} className="">
                    <span
                      id={groupId}
                      className={cn(
                        'text-xs font-semibold tracking-wider text-muted-foreground px-3 py-2 block',
                        'group',

                        'flex items-center justify-between py-3 px-3 rounded-lg',
                        'text-base font-medium no-underline',
                      )}
                    >
                      {item.groupName}
                    </span>
                    <ul
                      className="flex flex-col gap-0.5 border-l-2 border-primary/20 ml-3"
                      role="list"
                      aria-labelledby={groupId}
                    >
                      {item.links?.map((link, linkIndex) => (
                        <li
                          key={link.id}
                          style={{ animationDelay: `${index * 50 + linkIndex * 30 + 100}ms` }}
                        >
                          <Sheet.Close asChild>
                            <CMSLink
                              {...link.link}
                              appearance="inline"
                              className={cn(
                                'flex items-center justify-between py-2.5 px-3 ml-2 rounded-lg',
                                'text-sm no-underline text-foreground/80',
                                'hover:bg-accent hover:text-foreground transition-all duration-200',
                                'group',
                              )}
                            >
                              <ChevronRight
                                className="size-3.5 opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0 transition-all duration-200"
                                aria-hidden
                              />
                            </CMSLink>
                          </Sheet.Close>
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              })}
            </ul>
          </nav>

          <Sheet.Footer>
            <LocaleSelector
              render={(locale) => (
                <Sheet.Close asChild>
                  <Link
                    href="/"
                    locale={locale}
                    className={cn(
                      'flex items-center justify-between py-2.5 px-3 ml-2 rounded-lg',
                      'text-sm no-underline text-foreground/80 font-normal',
                      'hover:bg-accent hover:text-foreground transition-all duration-200',
                      'group',
                    )}
                  >
                    {locale}
                    <ChevronRight
                      className="size-3.5 opacity-50 translate-x-0 transition-all "
                      aria-hidden
                    />
                  </Link>
                </Sheet.Close>
              )}
            />
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet.Root>
    </div>
  )
}
