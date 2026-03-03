export const DEFAULT_VALUES = {
  collections: {
    page: {
      title: { en: 'Page', es: 'Página' },
    },
    posts: {
      title: { en: 'Title', es: 'Título' },
      relatedPostsIntro: { en: 'Related Posts', es: 'Publicaciones relacionadas' },
    },
    siteSettings: {
      siteName: { en: 'Site Name', es: 'Nombre del sitio' },
      seoTitleSuffix: { en: 'My Site', es: 'Mi sitio web' },
      defaultDescription: {
        en: 'My Site Description',
        es: 'Descripción de mi sitio',
      },
      defaultOgDescription: {
        en: 'My Site Description',
        es: 'Descripción de mi sitio',
      },
      notFoundTitle: {
        en: '404 - Page not found',
        es: 'Página no encontrada',
      },
      notFoundDescription: {
        en: 'Unfortunately, the requested page does not exist or has been deleted.',
        es: 'Lo sentimos, la página solicitada no existe o ha sido eliminada.',
      },
    },
    categories: {
      title: { en: 'Title', es: 'Título' },
    },
  },
  blocks: {
    hero: {
      title: { en: 'Hero', es: 'Hero' },
    },
    testimonialsList: {
      title: { en: 'Testimonials', es: 'Testimonials' },
      heading: { en: 'Our testimonials', es: 'Nuestros testimonios' },
      subheading: { en: 'What our clients say', es: 'Lo que dicen nuestros clientes' },
    },
    content: {
      heading: { en: 'Heading', es: 'Encabezado' },
    },
    faq: {
      heading: { en: 'FAQ', es: 'FAQ' },
      question: {
        en: 'Question',
        es: 'Pregunta',
      },
      answer: {
        en: {
          heading: 'Answer',
          paragraph: 'Add your answer here',
        },
        es: {
          heading: 'Respuesta',
          paragraph: 'Añade tu respuesta aquí',
        },
      },
    },
  },
  richText: {
    text: {
      en: {
        heading: 'Heading',
        paragraph: 'Text section. Replace with your content.',
      },
      es: {
        heading: 'Encabezado',
        paragraph: 'Sección de texto. Sustituye por tu contenido.',
      },
    },
    content: {
      en: {
        heading: 'Content heading',
        paragraph: 'Content section. Replace with your content.',
      },
      es: {
        heading: 'Encabezado de contenido',
        paragraph: 'Sección de contenido. Sustituye por tu contenido.',
      },
    },
  },
} as const
