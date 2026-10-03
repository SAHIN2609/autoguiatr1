# HZ MACHINE 1.4 Factory Preset Manifest

The 1.4 factory bank contains **148 unique presets**. It is intentionally guitar-first, with only six dedicated synth presets.

## Banks

- CLEAN — 16
- CRUNCH & ROCK — 16
- MODERN METAL — 16
- DJENT & RHYTHM — 14
- DEATH & EXTREME — 14
- PROGRESSIVE — 16
- LEAD — 16
- AMBIENT & TEXTURE — 14
- SITAR & WORLD — 10
- SPECIAL — 10
- SYNTH (6) — 6

## Preset design goals

Each preset is a distinct combination of amp mode, gain staging, tone stack, boost/drive state, cabinet, microphone, mic geometry, room amount, filtering and EQ. The synth presets are limited to six signature voices so the main factory bank remains focused on guitar production.

## 1.4 browser fixes

The top browser now uses a conventional native select element with explicit option values. Previous/next navigation uses the unique preset-name list instead of calculating indices from grouped `<option>` elements, which avoids WebView selection edge cases.
