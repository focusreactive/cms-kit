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
    <div className={cn('divide-y divide-primaryLightColor', className)}>
      {items.map((item) => (
        <div key={item.id}>
          <button
            type="button"
            id={`accordion-trigger-${item.id}`}
            className="flex w-full items-center justify-between py-4 text-left font-medium text-textColor hover:text-primaryColor transition-colors"
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
              className="pb-4 text-textSecondaryColor"
            >
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
