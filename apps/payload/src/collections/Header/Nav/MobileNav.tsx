'use client'
import React, { useState, useEffect } from 'react'
import { Menu, X, ChevronRight } from 'lucide-react'
import { CMSLink, Link } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import type { Header as HeaderType } from '@/payload-types'
import { LocaleSelector } from '@/features/LocaleSelector'

export const MobileNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const [open, setOpen] = useState(false)
  const navItems = data?.navItems || []

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className="flex md:hidden">
      <button
        type="button"
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
        className="flex items-center justify-center rounded-md p-2 text-textColor hover:bg-primaryLightColor transition-colors"
      >
        <Menu className="size-6" aria-hidden="true" />
      </button>

      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer — always rendered, slides in/out via transform */}
      <aside
        className={cn(
          'fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-bgColor shadow-xl transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-primaryLightColor px-6 py-4">
          <span className="text-xl font-semibold text-textColor">Navigation</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation menu"
            className="rounded-md p-1 text-textSecondaryColor hover:text-textColor hover:bg-primaryLightColor transition-colors"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Main navigation">
          <ul className="flex flex-col gap-1" role="list">
            {navItems.map((item, index) => {
              if (item.type === 'link') {
                return (
                  <li key={item.id ?? index}>
                    <CMSLink
                      {...item.link}
                      appearance="inline"
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium no-underline text-textColor hover:bg-primaryLightColor hover:text-primaryColor transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <ChevronRight className="size-4 text-textSecondaryColor" aria-hidden />
                    </CMSLink>
                  </li>
                )
              }

              if (item.type === 'links_group') {
                const groupId = `nav-group-${item.id ?? index}`
                return (
                  <li key={item.id ?? index}>
                    <span
                      id={groupId}
                      className="block px-3 py-2 text-xs font-semibold tracking-wider text-textSecondaryColor"
                    >
                      {item.groupName}
                    </span>
                    <ul
                      className="flex flex-col gap-0.5 border-l-2 border-primaryColor/20 ml-3"
                      role="list"
                      aria-labelledby={groupId}
                    >
                      {item.links?.map((link, linkIndex) => (
                        <li key={link.id ?? linkIndex}>
                          <CMSLink
                            {...link.link}
                            appearance="inline"
                            className="flex items-center justify-between ml-2 rounded-lg px-3 py-2.5 text-sm no-underline text-textSecondaryColor hover:bg-primaryLightColor hover:text-textColor transition-colors"
                            onClick={() => setOpen(false)}
                          >
                            <ChevronRight className="size-3.5 text-textSecondaryColor" aria-hidden />
                          </CMSLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              }

              return null
            })}
          </ul>
        </nav>

        <div className="border-t border-primaryLightColor px-4 py-4">
          <LocaleSelector
            render={(locale) => (
              <Link
                href="/"
                locale={locale}
                className="flex items-center justify-between ml-2 rounded-lg px-3 py-2.5 text-sm no-underline text-textSecondaryColor hover:bg-primaryLightColor hover:text-textColor transition-colors"
                onClick={() => setOpen(false)}
              >
                {locale}
                <ChevronRight className="size-3.5 text-textSecondaryColor" aria-hidden />
              </Link>
            )}
          />
        </div>
      </aside>
    </div>
  )
}
