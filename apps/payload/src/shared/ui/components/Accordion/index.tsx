'use client'
import React, { useState } from 'react'
import { cn } from '@/shared/lib/utils'
import { ChevronDownIcon } from 'lucide-react'

export interface AccordionItemData {
  id: string
  trigger: React.ReactNode
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItemData[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item) => (
        <div key={item.id} className="rounded-2xl border border-textSecondaryColor overflow-hidden">
          <button
            type="button"
            id={`accordion-trigger-${item.id}`}
            className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-textColor hover:text-primaryColor transition-colors"
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            aria-expanded={openId === item.id}
            aria-controls={`accordion-panel-${item.id}`}
          >
            <span>{item.trigger}</span>
            <ChevronDownIcon
              className={cn(
                'ml-4 size-4 shrink-0 text-textSecondaryColor transition-transform duration-200',
                openId === item.id && 'rotate-180',
              )}
              aria-hidden
            />
          </button>
          {openId === item.id && (
            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
              className="px-5 pb-5 text-textSecondaryColor"
            >
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
