import type { GroupField } from 'payload'

export const sectionFields: GroupField = {
  name: 'section',
  type: 'group',
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
      name: 'marginTop',
      type: 'select',
      label: { en: 'Margin Top', es: 'Margen Superior' },
      defaultValue: 'base',
      options: [
        { label: { en: 'None', es: 'Ninguno' }, value: 'none' },
        { label: { en: 'Base', es: 'Base' }, value: 'base' },
        { label: { en: 'Large', es: 'Grande' }, value: 'large' },
      ],
    },
    {
      name: 'marginBottom',
      type: 'select',
      label: { en: 'Margin Bottom', es: 'Margen Inferior' },
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
        { label: { en: 'Large', es: 'Grande' }, value: 'large' },
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
      name: 'maxWidth',
      type: 'select',
      label: { en: 'Max Width', es: 'Ancho Máximo' },
      defaultValue: 'base',
      options: [
        { label: { en: 'None', es: 'Ninguno' }, value: 'none' },
        { label: { en: 'Base', es: 'Base' }, value: 'base' },
        { label: { en: 'Small', es: 'Pequeño' }, value: 'small' },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: { en: 'Background Image', es: 'Imagen de Fondo' },
    },
  ],
}
