import { Where, type CollectionConfig } from 'payload'
import { authenticated, onlySelf, or, superAdmin, tenantAdmin } from '@/shared/lib/access'
import { tenantFields } from '@/fields/tenantFields'
import { beforeChangeTenant } from '@/hooks/beforeChangeTenant'
import { extractTenantId } from '@/shared/lib/extractTenantId'
import { isTenantEnabled } from '@/shared/config/tenant'

export const Users: CollectionConfig<'users'> = {
  slug: 'users',
  labels: {
    singular: {
      en: 'User',
      es: 'Usuario',
    },
    plural: {
      en: 'Users',
      es: 'Usuarios',
    },
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'role', 'email', 'updatedAt'],
    pagination: {
      limits: [20, 50, 100],
    },
    group: 'Collections',
  },
  access: {
    admin: authenticated,
    create: or(superAdmin, tenantAdmin),
    read: ({ req: { user } }) => {
      if (!user) return false

      if (superAdmin({ req: { user } })) return true

      if (!isTenantEnabled()) {
        return true
      }

      const userTenantIds = (user.tenants || [])
        .map((tenant) => extractTenantId(tenant.tenant))
        .filter(Boolean) as number[]

      if (userTenantIds.length === 0) return false

      return userTenantIds.length > 0
        ? ({
            tenants: {
              some: {
                tenant: {
                  in: userTenantIds,
                },
              },
            },
          } as Where)
        : false
    },

    update: ({ req: { user } }) => {
      if (!user) return false
      if (superAdmin({ req: { user } })) return true
      if (tenantAdmin({ req: { user } })) return true

      return onlySelf({ req: { user } } as { req: { user: typeof user } })
    },

    delete: ({ req: { user }, id }) => {
      if (!user) return false

      if (superAdmin({ req: { user } }) && id !== user.id) return true

      if (tenantAdmin({ req: { user } })) {
        if (id === user.id) return false

        if (!isTenantEnabled()) {
          return true
        }

        const userTenantIds = user.tenants
          ?.map((tenant) => extractTenantId(tenant.tenant))
          .filter((id): id is number => id !== undefined && id !== null)

        if (!userTenantIds || userTenantIds.length === 0) return false

        return {
          tenants: {
            some: {
              tenant: {
                in: userTenantIds,
              },
            },
          },
        } as Where
      }
      return false
    },
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: {
        en: 'Name',
        es: 'Nombre',
      },
      defaultValue: '',
      required: true,
      admin: {
        description: {
          en: 'The name of the user',
          es: 'El nombre del usuario',
        },
      },
    },
    {
      name: 'role',
      type: 'select',
      label: {
        en: 'Role',
        es: 'Rol',
      },
      options: [
        {
          label: {
            en: 'Admin',
            es: 'Admin',
          },
          value: 'admin',
        },
        {
          label: {
            en: 'Author',
            es: 'Autor',
          },
          value: 'author',
        },
        {
          label: {
            en: 'User',
            es: 'Usuario',
          },
          value: 'user',
        },
      ],
      defaultValue: 'admin',
      admin: {
        description: {
          en: 'The role of the user',
          es: 'El rol del usuario',
        },
        position: 'sidebar',
      },
      required: true,
      saveToJWT: true,
      access: {
        update: ({ req: { user }, doc }) => {
          if (!user) return false
          if (superAdmin({ req: { user } }) && user.id !== doc?.id) return true
          if (tenantAdmin({ req: { user } }) && user.id !== doc?.id) return true

          return false
        },
      },
    },
    ...tenantFields({ collection: 'users' }),
  ],
  hooks: {
    beforeChange: [beforeChangeTenant],
  },
}
