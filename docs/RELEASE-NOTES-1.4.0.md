# 1.4.0 — Preset Browser & Interaction Update

- Replaced the custom top preset shell with a conventional native dark select control.
- Reworked previous/next preset navigation to use a stable preset-name index rather than select-option arithmetic.
- Preset option values are now explicit, preventing browser/WebView selection edge cases.
- Added 36 new original factory presets for a total of 148.
- Kept the factory bank guitar-first with only six dedicated synth presets.
- Converted non-interactive signal-flow labels from disabled buttons into status pills.
- Added explicit `type="button"` and prevented default click behavior to generated UI buttons.
- Fixed pedal footswitch click handling and removed duplicate event registration.
- Updated project version to 1.4.0.
