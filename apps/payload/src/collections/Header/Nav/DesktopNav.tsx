import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink, NavigationMenu } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import { LocaleSelector } from '@/features/LocaleSelector'
import { ChevronDownIcon } from 'lucide-react'

const navigationMenuTriggerStyles = NavigationMenu.navigationMenuTriggerStyles()

export const DesktopNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav aria-label="Main navigation" className="hidden md:flex gap-4 items-center">
      <NavigationMenu.Root viewport={false}>
        <NavigationMenu.List className="flex-wrap gap-2 items-center justify-center">
          {navItems.map((item) => {
            return item.type === 'link' ? (
              <NavigationMenu.Item key={item.id}>
                <NavigationMenu.Link asChild>
                  <CMSLink
                    {...item.link}
                    appearance="inline"
                    className={cn(navigationMenuTriggerStyles)}
                  />
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ) : item.type === 'links_group' ? (
              <NavigationMenu.Item className={cn('cursor-pointer')} key={item.id}>
                <NavigationMenu.Trigger
                  className={cn(navigationMenuTriggerStyles, 'cursor-pointer')}
                >
                  {item.groupName}
                </NavigationMenu.Trigger>
                <NavigationMenu.Content>
                  <ul
                    className="grid w-[200px] gap-2"
                    role="list"
                    aria-label={`${item.groupName} links`}
                  >
                    {item.links?.map((link) => (
                      <li key={link.id} className="row-span-3 p-0 m-0">
                        <NavigationMenu.Link asChild>
                          <CMSLink
                            {...link.link}
                            appearance="inline"
                            className={cn(navigationMenuTriggerStyles, 'px-4 py-2 block w-full')}
                          />
                        </NavigationMenu.Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            ) : null
          })}

          <NavigationMenu.Item>
            <LocaleSelector
              render={(locale) => (
                <span
                  className={cn(
                    navigationMenuTriggerStyles,
                    'group flex items-center gap-1 cursor-pointer',
                  )}
                >
                  {locale}
                  <ChevronDownIcon
                    className="size-3 transition-transform duration-300 group-data-[state=open]:rotate-180"
                    aria-hidden="true"
                  />
                </span>
              )}
            />
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </nav>
  )
}
