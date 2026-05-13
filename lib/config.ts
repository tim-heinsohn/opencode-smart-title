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
 * Merge OpenCode's main config with plugin defaults.
 *
 * Resolution order (later overrides earlier):
 *   1. Plugin defaults
 *   2. OpenCode `small_model` (used for title generation)
 *   3. Plugin-specific block under the `"smart-title"` key in opencode.json
 */
export function mergeConfig(opencodeConfig?: Config | null): PluginConfig {
    const config = { ...defaultConfig }

    if (!opencodeConfig) return config

    // OpenCode has a built-in `small_model` key for lightweight tasks like title generation
    if (opencodeConfig.small_model) {
        config.model = opencodeConfig.small_model
    }

    // Plugin-specific toggles can live under a "smart-title" key in opencode.json
    const pluginSettings = (opencodeConfig as Record<string, unknown>)["smart-title"]
    if (pluginSettings && typeof pluginSettings === "object") {
        const settings = pluginSettings as Partial<PluginConfig>
        if (settings.enabled !== undefined) config.enabled = settings.enabled
        if (settings.debug !== undefined) config.debug = settings.debug
        if (settings.model !== undefined) config.model = settings.model
        if (settings.updateThreshold !== undefined) config.updateThreshold = settings.updateThreshold
        if (settings.appendCwd !== undefined) config.appendCwd = settings.appendCwd
        if (settings.appendHostname !== undefined) config.appendHostname = settings.appendHostname
    }

    return config
}
