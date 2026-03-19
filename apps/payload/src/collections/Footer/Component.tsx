import React from 'react'

import type { Footer as FooterType, Media } from '@/payload-types'
import { CMSLink, Link, Logo } from '@/core/ui'
import { cn } from '@/core/lib/utils'

const getGridCols = (count: number) => {
  if (count <= 2) {
    return 'grid-cols-1 sm:grid-cols-2'
  }
  if (count === 3) {
    return 'grid-cols-1 md:grid-cols-3'
  }
  return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
}

type Props = {
  data: FooterType
}

export async function Footer({ data }: Props) {
  if (!data) return null

  const navItems = data?.navItems || []
  const colCount = Math.min(Math.max(navItems.length, 2), 4)

  return (
    <footer className="mt-auto border-t border-border bg-black text-white" aria-label="Site footer">
      <div className="py-12 px-4 sm:py-16 sm:px-6 md:py-20 md:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Footer navigation">
            <ul className={cn('grid gap-8 md:gap-12 mb-12', getGridCols(colCount))} role="list">
              {navItems.map((group) => {
                const groupId = `footer-group-${group.id}`
                return (
                  <li
                    key={group.id}
                    className="flex flex-col"
                    role="group"
                    aria-labelledby={groupId}
                  >
                    <h3 id={groupId} className="text-lg font-semibold mb-4 text-white/90">
                      {group.groupName}
                    </h3>
                    <ul className="flex flex-col gap-3" role="list">
                      {group.links.map((link) => {
                        return (
                          <li key={link.id}>
                            <CMSLink
                              {...link.link}
                              className="text-sm text-white/70 hover:text-white transition-colors duration-200 w-fit"
                            />
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div
            className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            role="contentinfo"
          >
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity"
              aria-label="Go to homepage"
            >
              <Logo resource={data.logo as Media} />
            </Link>
            <p className="text-sm text-white/50 mb-0">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
