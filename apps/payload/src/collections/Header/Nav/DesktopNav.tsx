'use client'
import React, { useState, useRef, useEffect } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { cn } from '@/core/lib/utils'
import { LocaleSelector } from '@/features/LocaleSelector'
import { ChevronDownIcon } from 'lucide-react'
import { Button, Link } from '@shared/ui'
import { prepareLinkProps } from '@/lib/adapters/prepareLinkProps'

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
    <nav ref={navRef} aria-label="Main navigation" className="hidden md:flex gap-4 items-center">
      {navItems.map((item, index) => {
        if (item.type === 'link') {
          return <Link key={item.id ?? index} {...prepareLinkProps(item.link)} />
        }

        if (item.type === 'links_group') {
          const isOpen = openGroup === item.id
          return (
            <div key={item.id ?? index} className="relative">
              <Button
                type="button"
                className="flex items-center gap-1"
                onClick={() => setOpenGroup(isOpen ? null : (item.id ?? null))}
                aria-expanded={isOpen}
              >
                {item.groupName}
                <ChevronDownIcon
                  className={cn('size-3 transition-transform duration-200', isOpen && 'rotate-180')}
                  aria-hidden
                />
              </Button>
              {isOpen && (
                <ul
                  className="absolute top-full left-0 z-50 mt-1 w-48 rounded-md border border-primaryLightColor bg-bgColor py-1 shadow-lg"
                  role="list"
                  aria-label={`${item.groupName} links`}
                >
                  {item.links?.map((link, linkIndex) => (
                    <li
                      key={link.id ?? linkIndex}
                      className="px-1"
                      role="button"
                      onClick={() => setOpenGroup(null)}
                    >
                      <Link
                        className="inline-block"
                        key={item.id ?? index}
                        {...prepareLinkProps(link.link)}
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
          <Button className="flex items-center gap-1">
            {locale}
            <ChevronDownIcon className="size-3" aria-hidden />
          </Button>
        )}
      />
    </nav>
  )
}
