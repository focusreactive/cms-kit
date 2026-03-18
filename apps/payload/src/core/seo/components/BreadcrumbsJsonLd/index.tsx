import React from 'react'
import { createBreadcrumbsSchema } from '@/core/seo/schemas'
import { JsonLd } from '../JsonLd'
import { CreateBreadcrumbsOptions } from '../../schemas/breadcrumbsSchema'

type BreadcrumbsJsonLdProps = CreateBreadcrumbsOptions

export async function BreadcrumbsJsonLd(props: BreadcrumbsJsonLdProps) {
  const structuredData = await createBreadcrumbsSchema(props)
  return <JsonLd data={structuredData} />
}