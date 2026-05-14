// lib/config.ts
import type { Config } from "@opencode-ai/sdk"

export interface PluginConfig {
    enabled: boolean
    debug: boolean
    model?: string
    updateThreshold: number
    appendCwd: boolean
    appendHostname: boolean
}

const defaultConfig: PluginConfig = {
    enabled: true,
    debug: false,
    updateThreshold: 1,
    appendCwd: true,
    appendHostname: true,
}

/**
 * Merge plugin options and OpenCode config with defaults.
 *
 * Resolution order (later overrides earlier):
 *   1. Plugin defaults
 *   2. OpenCode `small_model` (used for title generation)
 *   3. Plugin options passed as the tuple second element in opencode.json
 */
export function mergeConfig(
    opencodeConfig?: Config | null,
    pluginOptions?: Partial<PluginConfig>
): PluginConfig {
    const config = { ...defaultConfig }

    if (opencodeConfig?.small_model) {
        config.model = opencodeConfig.small_model
    }

    if (pluginOptions) {
        if (pluginOptions.enabled !== undefined) config.enabled = pluginOptions.enabled
        if (pluginOptions.debug !== undefined) config.debug = pluginOptions.debug
        if (pluginOptions.model !== undefined) config.model = pluginOptions.model
        if (pluginOptions.updateThreshold !== undefined) config.updateThreshold = pluginOptions.updateThreshold
        if (pluginOptions.appendCwd !== undefined) config.appendCwd = pluginOptions.appendCwd
        if (pluginOptions.appendHostname !== undefined) config.appendHostname = pluginOptions.appendHostname
    }

    return config
}
