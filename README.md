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

All settings live in your main OpenCode config (`~/.config/opencode/opencode.json` or `.opencode/opencode.json`).

### Title model

OpenCode has a built-in `small_model` key for lightweight tasks like title generation. We use it automatically, so you don't need a separate model setting for this plugin.

```json
{
  "small_model": "google/gemini-2.5-flash"
}
```

> **Why `small_model`?** Kimi K2.6 does not offer a small / flash variant, so it's a good idea to route title generation to a cheaper, faster model such as Gemini 2.5 Flash. If `small_model` is not set, the plugin falls back to your default agent model.

### Plugin-specific toggles

Put them under the `"smart-title"` key in the same file:

```json
{
  "plugin": ["@tarquinen/opencode-smart-title"],
  "small_model": "google/gemini-2.5-flash",
  "smart-title": {
    "enabled": true,
    "debug": false,
    "updateThreshold": 1,
    "appendCwd": true,
    "appendHostname": true
  }
}
```

| Option | Default | Description |
|--------|---------|-------------|
| `enabled` | `true` | Enable or disable the plugin |
| `debug` | `false` | Enable debug logging to `~/.config/opencode/logs/smart-title/` |
| `updateThreshold` | `1` | Update title every N idle events (`1` = every time you pause) |
| `appendCwd` | `true` | Append the current working directory on a new line |
| `appendHostname` | `true` | Append the hostname on the same extra line |

## License

MIT
