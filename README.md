# Smart Title Plugin

Auto-generates meaningful session titles for your OpenCode conversations using AI.

## What It Does

- Watches your conversation and generates short, descriptive titles
- Updates automatically when the session becomes idle (you stop typing)
- Uses OpenCode's unified auth - no API keys needed
- Works with any authenticated AI provider

## Installation

```bash
npm install @tarquinen/opencode-smart-title
```

Add to `~/.config/opencode/opencode.json`:

```json
{
  "plugin": ["@tarquinen/opencode-smart-title"]
}
```

## Development

For local testing, use the OpenCode plugin dev runner (recommended):

```bash
npm install
npm run dev
```

Then enable the local dev plugin in your `opencode.json`:

```json
{
  "plugin": ["@tarquinen/opencode-smart-title"]
}
```

If you prefer manual linking, you can build and load from a local plugin directory:

```bash
npm install
npm run build
```

Then copy or symlink the built plugin into one of:

- `~/.config/opencode/plugins/`
- `.opencode/plugins/`

## Configuration

The plugin supports both global and project-level configuration:

- **Global:** `~/.config/opencode/smart-title.jsonc` - Applies to all sessions
- **Project:** `.opencode/smart-title.jsonc` - Overrides global config

The plugin creates a default global config on first run.

```jsonc
{
  // Enable or disable the plugin
  "enabled": true,

  // Enable debug logging
  "debug": false,

  // Optional: Use a specific model (otherwise uses smart fallbacks)
  // "model": "anthropic/claude-haiku-4-5",

  // Update title every N idle events (1 = every time you pause)
  "updateThreshold": 1,

  // Append the current working directory on a new line
  "appendCwd": true,

  // Append the hostname on a new line
  "appendHostname": true
}
```

## License

MIT
