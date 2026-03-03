import { Tenant } from '@/payload-types'
import path from 'node:path'
import fs from 'node:fs'
import { CollectionAfterChangeHook } from 'payload'
import { isTenantEnabled } from '@/shared/config/tenant'

export const afterCreateTenant: CollectionAfterChangeHook<Tenant> = async ({
  doc,
  operation,
  req,
  context,
}) => {
  if (!isTenantEnabled() || context?.disableRevalidate) {
    return
  }

  if (operation === 'create') {
    await req.payload.create({
      collection: 'site-settings',
      data: {
        tenant: doc.id,
      },
      req,
      overrideAccess: true,
    })

    await req.payload.create({
      collection: 'blog-page-settings',
      data: {
        tenant: doc.id,
      },
      req,
      overrideAccess: true,
    })

    const publicPath = path.join(process.cwd(), 'public', 'empty-placeholder.jpg')

    if (fs.existsSync(publicPath)) {
      const fileBuffer = fs.readFileSync(publicPath)

      await req.payload.create({
        collection: 'media',
        data: {
          alt: 'Default Theme Placeholder',
          filename: 'empty-placeholder.jpg',
          tenant: typeof doc.id === 'number' ? doc.id : doc,
          tenants: [{ tenant: doc.id }],
          defaultFor: ['platform_default'],
        },
        file: {
          data: fileBuffer,
          mimetype: 'image/jpeg',
          size: fileBuffer.length,
          name: 'empty-placeholder.jpg',
        },
        overrideAccess: true,
        req,
      })
    }
  }
}
