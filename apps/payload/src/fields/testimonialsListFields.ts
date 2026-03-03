import { DEFAULT_VALUES } from '@/shared/constants/defaultValues'
import { createLocalizedDefault } from '@/shared/lib/createLocalizedDefault'
import type { Field } from 'payload'

export const testimonialsListFields: Field[] = [
  {
    name: 'heading',
    type: 'text',
    label: { en: 'Heading', es: 'Encabezado' },
    localized: true,
    defaultValue: createLocalizedDefault(DEFAULT_VALUES.blocks.testimonialsList.heading),
  },
  {
    name: 'subheading',
    type: 'text',
    label: { en: 'Subheading', es: 'Subencabezado' },
    localized: true,
    defaultValue: createLocalizedDefault(DEFAULT_VALUES.blocks.testimonialsList.subheading),
  },
  {
    name: 'testimonialItems',
    type: 'array',
    label: { en: 'Testimonials', es: 'Testimonios' },
    minRows: 1,
    fields: [
      {
        name: 'testimonial',
        type: 'relationship',
        relationTo: 'testimonials',
        required: true,
        label: { en: 'Testimonial', es: 'Testimonio' },
      },
    ],
  },
  {
    name: 'duration',
    type: 'number',
    defaultValue: 60,
    label: { en: 'Animation duration (seconds)', es: 'Duración de la animación (segundos)' },
    admin: {
      placeholder: '60',
      description: {
        en: 'The duration of the animation in seconds. Default is 60 seconds.',
        es: 'La duración de la animación en segundos. Por defecto es 60 segundos.',
      },
    },
  },
  {
    name: 'showRating',
    type: 'checkbox',
    defaultValue: true,
    label: { en: 'Show Rating', es: 'Mostrar Calificación' },
  },
  {
    name: 'showAvatar',
    type: 'checkbox',
    defaultValue: true,
    label: { en: 'Show Avatar', es: 'Mostrar Avatar' },
  },
]
