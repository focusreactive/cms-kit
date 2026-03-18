'use client'
import React, { useState, useRef, useEffect } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/core/ui'
import { cn } from '@/core/lib/utils'
import { LocaleSelector } from '@/features/LocaleSelector'
import { ChevronDownIcon } from 'lucide-react'

const navLinkClass =
  'px-3 py-2 text-sm font-medium text-textColor hover:text-primaryColor hover:bg-primaryLightColor rounded-md transition-colors no-underline'

export const DesktopNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenGroup(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav ref={navRef} aria-label="Main navigation" className="hidden md:flex gap-1 items-center">
      {navItems.map((item, index) => {
        if (item.type === 'link') {
          return (
            <CMSLink
              key={item.id ?? index}
              {...item.link}
              appearance="inline"
              className={navLinkClass}
            />
          )
        }

        if (item.type === 'links_group') {
          const isOpen = openGroup === item.id
          return (
            <div key={item.id ?? index} className="relative">
              <button
                type="button"
                className={cn(navLinkClass, 'flex items-center gap-1 cursor-pointer')}
                onClick={() => setOpenGroup(isOpen ? null : (item.id ?? null))}
                aria-expanded={isOpen}
              >
                {item.groupName}
                <ChevronDownIcon
                  className={cn('size-3 transition-transform duration-200', isOpen && 'rotate-180')}
                  aria-hidden
                />
              </button>
              {isOpen && (
                <ul
                  className="absolute top-full left-0 z-50 mt-1 w-48 rounded-md border border-primaryLightColor bg-bgColor py-1 shadow-lg"
                  role="list"
                  aria-label={`${item.groupName} links`}
                >
                  {item.links?.map((link, linkIndex) => (
                    <li key={link.id ?? linkIndex} className="px-1">
                      <CMSLink
                        {...link.link}
                        appearance="inline"
                        className="block rounded px-3 py-2 text-sm text-textColor hover:bg-primaryLightColor hover:text-primaryColor transition-colors no-underline"
                        onClick={() => setOpenGroup(null)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        }

        return null
      })}
      <LocaleSelector
        render={(locale) => (
          <span className={cn(navLinkClass, 'flex items-center gap-1 cursor-pointer')}>
            {locale}
            <ChevronDownIcon className="size-3" aria-hidden />
          </span>
        )}
      />
    </nav>
  )
}
