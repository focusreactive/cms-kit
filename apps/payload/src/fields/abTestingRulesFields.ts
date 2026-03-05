import { Field } from 'payload'

export function abTestingRulesFields(): Field[] {
  return [
    {
      name: 'passPercentage',
      type: 'number',
      required: true,
      defaultValue: 50,
      min: 1,
      max: 99,
      label: { en: 'Pass Percentage (%)', es: 'Porcentaje de Tráfico (%)' },
      admin: {
        description: {
          en: 'Percentage of visitors routed to this variant. All variants for the same page must sum to ≤ 100%; the remainder is served the original page.',
          es: 'Porcentaje de visitantes enrutados a esta variante. Todas las variantes de la misma página deben sumar ≤ 100%; el resto recibe la página original.',
        },
      },
    },
  ]
}
