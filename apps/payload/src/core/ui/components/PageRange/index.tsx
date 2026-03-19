'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

export const PageRange: React.FC<{
  className?: string
  collection?: 'posts' | 'docs'
  collectionLabels?: {
    plural?: string
    singular?: string
  }
  currentPage?: number
  limit?: number
  totalDocs?: number
}> = (props) => {
  const {
    className,
    collection,
    collectionLabels: collectionLabelsFromProps,
    currentPage,
    limit,
    totalDocs,
  } = props

  const t = useTranslations('pageRange')

  if (!totalDocs) return null

  let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd: number = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  const getLabels = () => {
    if (collectionLabelsFromProps) {
      return {
        plural: collectionLabelsFromProps.plural || 'Docs',
        singular: collectionLabelsFromProps.singular || 'Doc',
      }
    }
    if (collection) {
      return {
        plural: t(`${collection}.plural`) || 'Docs',
        singular: t(`${collection}.singular`) || 'Doc',
      }
    }
    return {
      plural: t('docs.plural') || 'Docs',
      singular: t('docs.singular') || 'Doc',
    }
  }

  const { plural, singular } = getLabels()

  return (
    <div className={[className, 'font-semibold'].filter(Boolean).join(' ')}>
      {(typeof totalDocs === 'undefined' || totalDocs === 0) && t('noResults')}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
        t('showing', {
          start: indexStart || 0,
          end: indexStart > 0 ? t('showingEnd', { end: indexEnd || 0 }) : '',
          total: totalDocs,
          label: totalDocs > 1 ? plural : singular,
        })}
    </div>
  )
}
