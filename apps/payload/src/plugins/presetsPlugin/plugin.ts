import type {
  Access,
  CollectionConfig,
  CollectionSlug,
  Config,
  Field,
  Plugin,
  StaticLabel,
} from 'payload'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

/**
 * Auto-detect plugin base path from current file location.
 * Works by finding the path relative to 'src/' directory.
 */
function detectPluginBasePath(): string {
  try {
    const currentFilePath = fileURLToPath(import.meta.url)
    const pluginDir = path.dirname(currentFilePath)

    // Find 'src/' in the path to determine relative path
    const srcMatch = pluginDir.match(/[/\\]src[/\\](.+)$/)
    if (srcMatch) {
      // Convert path separators to forward slashes for the alias
      const relativePath = srcMatch[1].replace(/\\/g, '/')
      return `@/${relativePath}`
    }
  } catch {
    // Fallback if import.meta.url is not available (CommonJS)
  }

  return '@/plugins/presetsPlugin'
}

/** Detected base path for this plugin instance */
const PLUGIN_BASE_PATH = detectPluginBasePath()

/**
 * Generates component path for Payload admin components.
 *
 * For npm packages: 'package-name/client#ComponentName'
 * For local dev: 'basePath/componentPath#ComponentName'
 *
 * @param packageName - npm package name (e.g. '@myorg/presets-plugin'), or undefined for local dev
 * @param componentPath - relative path within plugin (e.g. 'components/PresetAdminComponentPreview')
 * @param componentName - exported component name
 */
export function getPluginComponentPath(
  packageName: string | undefined,
  componentPath: string,
  componentName: string,
): string {
  if (packageName) {
    // For npm package: 'package-name/client#Component'
    return `${packageName}/client#${componentName}`
  }

  // For local dev: 'basePath/componentPath#ComponentName'
  return `${PLUGIN_BASE_PATH}/${componentPath}#${componentName}`
}

/** Client-side config stored in admin.custom.presetsPlugin */
export interface PresetsPluginClientConfig {
  slug: CollectionSlug
  presetTypes: string[]
  /** Keys to exclude at all nesting levels (id, blockType, etc.) */
  excludeKeys: string[]
  /** Media collection slug for preview images (default: 'media') */
  mediaCollection: string
}

export interface PresetBlockType {
  /** Unique identifier for this preset type */
  value: string
  /** Display label (required) */
  label: string | StaticLabel
  /** Fields for this preset type */
  fields: Field[]
}

export interface PresetsPluginConfig {
  slug?: string
  labels?: CollectionConfig['labels']
  enabled?: boolean
  /**
   * npm package name for production (e.g. '@myorg/payload-presets-plugin')
   * If not provided, uses local path '@/plugins/presetsPlugin' for development
   */
  packageName?: string
  /** Media collection slug for preview images (default: 'media') */
  mediaCollection?: string
  /** Preset types - array of { value, label, fields } */
  presetTypes: PresetBlockType[]
  /** Collection overrides */
  overrides?: {
    /** Access control */
    access?: {
      create?: Access
      read?: Access
      update?: Access
      delete?: Access
    }
    /** Modify fields - receives default fields, return final fields */
    fields?: (defaultFields: Field[]) => Field[]
    /** All collection hooks */
    hooks?: CollectionConfig['hooks']
    /** Admin config overrides */
    admin?: Partial<CollectionConfig['admin']>
  }
}

const createPresetsCollection = (config: PresetsPluginConfig): CollectionConfig<'presets'> => {
  const {
    presetTypes,
    overrides = {},
    slug = 'presets',
    labels = { singular: { en: 'Preset', es: 'Preset' }, plural: { en: 'Presets', es: 'Presets' } },
    packageName,
    mediaCollection = 'media',
  } = config

  const previewFieldPath = getPluginComponentPath(
    packageName,
    'components/PresetAdminComponentPreview',
    'PresetAdminComponentPreview',
  )

  const previewCellPath = getPluginComponentPath(
    packageName,
    'components/PresetAdminComponentCell',
    'PresetAdminComponentCell',
  )

  const typeOptions = presetTypes.map(({ value, label }) => ({ value, label }))

  const presetTypeGroupFields: Field[] = presetTypes.map(({ value, label, fields }) => ({
    name: value,
    type: 'group' as const,
    label,
    admin: {
      condition: (_: unknown, siblingData: { type?: string }) => siblingData?.type === value,
    },
    fields,
  }))

  const defaultFields: Field[] = [
    {
      name: 'previewDisplay',
      label: { en: 'Preview', es: 'Vista previa' },
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: previewFieldPath,
        },
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: { en: 'Preset Name', es: 'Nombre del Preset' },
      localized: true,
    },
    {
      name: 'preview',
      type: 'upload',
      relationTo: mediaCollection as CollectionSlug,
      admin: {
        description: {
          en: 'The preview image for the preset',
          es: 'La imagen de vista previa para el preset',
        },
        components: {
          Cell: previewCellPath,
        },
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: typeOptions,
      label: { en: 'Preset Type', es: 'Tipo de Preset' },
      admin: {
        description: {
          en: 'Choose type — only the matching section below will be shown.',
          es: 'Elige tipo — solo se mostrará la sección correspondiente.',
        },
      },
    },
    ...presetTypeGroupFields,
  ]

  const finalFields = overrides.fields ? overrides.fields(defaultFields) : defaultFields

  return {
    slug,
    labels,
    access: overrides.access || {},
    admin: {
      useAsTitle: 'name',
      defaultColumns: ['name', 'preview', 'type', 'updatedAt'],
      group: 'Collections',
      description: {
        en: 'One preset = one type. After choosing type, fill the matching section below.',
        es: 'Un preset = un tipo. Tras elegir tipo, rellena la sección correspondiente.',
      },
      ...overrides.admin,
    },
    fields: finalFields,
    timestamps: true,
    hooks: overrides.hooks || {},
  }
}

/**
 * Creates the presetActions UI field for use in page blocks.
 * This field renders Save/Apply preset buttons.
 *
 * @param packageName - npm package name (e.g. '@myorg/presets-plugin') or undefined for local dev
 */
export function createPresetActionsField(packageName?: string): Field {
  const componentPath = getPluginComponentPath(
    packageName,
    'components/presetActions/PresetActionsField',
    'PresetActionsField',
  )

  return {
    name: 'presetActions',
    type: 'ui',
    admin: {
      components: { Field: componentPath },
    },
    label: { en: 'Preset Actions', es: 'Acciones de Preset' },
  }
}

/**
 * Returns the component path for BlocksFieldWithPresets.
 * Use in admin.components.Field of a blocks field.
 *
 * @param packageName - npm package name or undefined for local dev
 */
export function getBlocksFieldWithPresetsPath(packageName?: string): string {
  return getPluginComponentPath(
    packageName,
    'components/blocksDrawer/BlocksFieldWithPresets',
    'BlocksFieldWithPresets',
  )
}

const pluginTranslations = {
  en: {
    presetsPlugin: {
      presetActions: {
        heading: 'Save as Preset',
        presetName: 'Preset name',
        setAsPresetAfterSave: 'Set as preset after save',
        replaceBlockWithPreset: 'Replace this block with preset after save',
        save: 'Save',
        cancel: 'Cancel',
        saveButton: 'Save as Preset',
        errorEnterName: 'Enter a preset name.',
        successSaved: 'Preset "{{name}}" saved.',
        errorFailed: 'Failed to save preset',
      },
      applyPreset: {
        applyButton: 'Apply Preset',
        errorInvalidPreset: 'Invalid preset type.',
        errorNoData: 'Preset has no data.',
        successApplied: 'Preset "{{name}}" applied.',
      },
      blocksDrawer: {
        noPresetsAvailable: 'No presets available',
        addBlockWithPreset: 'Add block with preset',
        addBlockTitle: 'Add block',
      },
    },
  },
  es: {
    presetsPlugin: {
      presetActions: {
        heading: 'Guardar como preset',
        presetName: 'Nombre del preset',
        setAsPresetAfterSave: 'Usar como preset después de guardar',
        replaceBlockWithPreset: 'Reemplazar este bloque por el preset tras guardar',
        save: 'Guardar',
        cancel: 'Cancelar',
        saveButton: 'Guardar como preset',
        errorEnterName: 'Introduce un nombre para el preset.',
        successSaved: 'Preset "{{name}}" guardado.',
        errorFailed: 'Error al guardar el preset',
      },
      applyPreset: {
        applyButton: 'Aplicar Preset',
        errorInvalidPreset: 'Tipo de preset inválido.',
        errorNoData: 'El preset no tiene datos.',
        successApplied: 'Preset "{{name}}" aplicado.',
      },
      blocksDrawer: {
        noPresetsAvailable: 'No hay presets disponibles',
        addBlockWithPreset: 'Añadir bloque con preset',
        addBlockTitle: 'Añadir bloque',
      },
    },
  },
}

export const presetsPlugin =
  (config: PresetsPluginConfig): Plugin =>
  (incomingConfig: Config): Config => {
    const { enabled = true, slug = 'presets', presetTypes, mediaCollection = 'media' } = config

    if (!enabled) {
      return incomingConfig
    }

    const presetsCollection = createPresetsCollection(config)

    // Client config for usePresetsConfig hook
    const clientConfig: PresetsPluginClientConfig = {
      slug: slug as CollectionSlug,
      presetTypes: presetTypes.map((pt) => pt.value),
      excludeKeys: ['id', 'blockType', 'blockName'],
      mediaCollection,
    }

    // Merge translations with English fallback for unsupported languages
    const incomingTranslations = incomingConfig.i18n?.translations as
      | Record<string, object>
      | undefined
    const mergedTranslations: Record<string, object> = { ...incomingTranslations }
    const supportedLanguages = Object.keys(pluginTranslations)

    for (const [lang, translations] of Object.entries(pluginTranslations)) {
      mergedTranslations[lang] = {
        ...(mergedTranslations[lang] || {}),
        ...translations,
      }
    }

    // Add English translations as fallback for languages not supported by the plugin
    for (const lang of Object.keys(mergedTranslations)) {
      if (!supportedLanguages.includes(lang)) {
        const existing = mergedTranslations[lang] as Record<string, unknown>
        // Only add if presetsPlugin translations don't exist for this language
        if (!existing?.presetsPlugin) {
          mergedTranslations[lang] = {
            ...existing,
            ...pluginTranslations.en,
          }
        }
      }
    }

    return {
      ...incomingConfig,
      admin: {
        ...incomingConfig.admin,
        custom: {
          ...incomingConfig.admin?.custom,
          presetsPlugin: clientConfig,
        },
      },
      i18n: {
        ...incomingConfig.i18n,
        translations: mergedTranslations,
      },
      collections: [...(incomingConfig.collections || []), presetsCollection],
    }
  }
