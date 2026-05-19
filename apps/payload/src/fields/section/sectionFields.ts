import type { GroupField } from 'payload'

export const sectionFields: GroupField = {
  name: 'section',
  type: 'group',
  label: false,
  fields: [
    {
      name: 'theme',
      type: 'select',
      label: { en: 'Theme', es: 'Tema' },
      options: [
        { label: { en: 'Light', es: 'Claro' }, value: 'light' },
        { label: { en: 'Dark', es: 'Oscuro' }, value: 'dark' },
        { label: { en: 'Light Gray', es: 'Gris Claro' }, value: 'light-gray' },
        { label: { en: 'Dark Gray', es: 'Gris Oscuro' }, value: 'dark-gray' },
      ],
    },
    {
      name: 'paddingY',
      type: 'select',
      label: { en: 'Padding Y', es: 'Relleno Vertical' },
      defaultValue: 'base',
      options: [
        { label: { en: 'None', es: 'Ninguno' }, value: 'none' },
        { label: { en: 'Base', es: 'Base' }, value: 'base' },
        { label: { en: 'Large', es: 'Grande' }, value: 'large' },
      ],
    },
    {
      name: 'paddingX',
      type: 'select',
      label: { en: 'Padding X', es: 'Relleno Horizontal' },
      defaultValue: 'base',
      options: [
        { label: { en: 'None', es: 'Ninguno' }, value: 'none' },
        { label: { en: 'Base', es: 'Base' }, value: 'base' },
      ],
    },
    {
      name: 'maxWidth',
      type: 'select',
      label: { en: 'Max Width', es: 'Ancho Máximo' },
      defaultValue: 'base',
      options: [
        { label: { en: 'None', es: 'Ninguno' }, value: 'none' },
        { label: { en: 'Base', es: 'Base' }, value: 'base' },
      ],
    },
    {
      name: 'background',
      type: 'group',
      label: { en: 'Background', es: 'Fondo' },
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          label: { en: 'Background (Image or Video)', es: 'Fondo (Imagen o Video)' },
          filterOptions: () => ({
            'folder.name': {
              equals: 'Background',
            },
          }),
          admin: {
            description: {
              en: 'Upload an image or video. Use the "Background" folder.',
              es: 'Sube una imagen o video. Usa la carpeta "Background".',
            },
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'overlay',
              type: 'select',
              dbName: 'sec_bg_ovrly',
              label: { en: 'Overlay Color', es: 'Color de Capa' },
              options: [
                { label: { en: 'Black', es: 'Negro' }, value: 'black' },
                { label: { en: 'White', es: 'Blanco' }, value: 'white' },
              ],
              admin: {
                width: '50%',
                condition: (_, siblingData) => !!siblingData?.media,
              },
            },
            {
              name: 'opacity',
              type: 'number',
              label: { en: 'Overlay Opacity (%)', es: 'Opacidad de Capa (%)' },
              min: 0,
              max: 100,
              defaultValue: 35,
              admin: {
                width: '50%',
                condition: (_, siblingData) => !!siblingData?.overlay,
                description: {
                  en: '0 = transparent, 100 = fully opaque',
                  es: '0 = transparente, 100 = completamente opaco',
                },
              },
            },
          ],
        },
      ],
    },
  ],
}
