# SISHHIN HZ MACHINE

Original guitar amp / cabinet / synth processor built with JUCE 8 and C++17.

## What is improved in this revision

- **Five amp voicings** with broader gain ranges and more mode-specific tone shaping: Clean, Crunch, Modern, Lead and Sitar.
- **Six built-in cabinet curves** with distance, position and angle controls: 1x12 Open, 2x12 Open, 4x12 Modern, 4x12 Dark, 2x12 Bright and 4x10 Dry.
- **External IR loader** for WAV/AIF/AIFF/FLAC plus blend control. Commercial IR files are not bundled.
- **4x oversampled drive + amp stage** with smoothed controls to reduce zippering and aliasing.
- **Expanded guitar synth** with eight original voice archetypes: Glass, Classic, Modern, Pluck, Air, FM Metal, Pulse and Bass.
- Synth controls for **Osc 2, detune, pulse width, LP/HP/BP filter choice, envelope filter amount, LFO rate/depth, glide and noise**.
- **158 curated factory presets**, generated from original HZ MACHINE voicings and split across Clean, Crunch, Modern Metal, Djent, Death, Progressive, Lead, Ambient, Sitar, Synth Metal, Synthwave and Experimental banks.
- UI updated toward a **dark metal / purple hardware aesthetic inspired by the supplied premium amp/synth references, with a large hardware-style amp face, textured grille, central emblem, top preset strip and compact navigation** with amp-specific grille treatments, cabinet graphics, synth voice selector, preset browser and A/B snapshots.
- GitHub Actions workflow builds and packages the **Windows x64 VST3** automatically and publishes tagged releases.

## Build

The project uses CMake and downloads JUCE 8.0.6 through `FetchContent`.

### Windows / GitHub Actions

Push to `main`/`master` or run the workflow manually. A successful build uploads:

`SISHHIN-HZ-MACHINE-VST3-Windows-x64`

Create a tag such as `v1.4.0` to additionally create a GitHub release ZIP.

### Local build

On Windows with Visual Studio installed:

```powershell
cmake -S . -B build -A x64 -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release --parallel
```

The generated plugin is a **VST3**. VST2 is intentionally not enabled; it requires the separate VST2 SDK/licensing path and is not part of a modern JUCE 8 VST3 build.

## IRs

Use the **Load WAV IR** button on the Cabinet page to load your own impulse responses. Keep the IRs you distribute compliant with their licenses; this repository does not include third-party cabinet captures.


## 1.4 PRO glass UI + preset browser fix

The 1.4 interface is a dark, frosted-glass hardware UI with a premium preset shell, A/B snapshots, mode-reactive lighting, glass navigation, redesigned synth/cabinet pages and responsive layouts. The design is original and does not bundle third-party brand artwork.

The source design library is in `Source/ui/assets/` and supporting specifications are in `docs/`.


## v1.5 ABYSS Signature Amp Remodel

The amp hero was remodeled around the supplied extreme-metal emblem: a dark machined-metal chassis, oversized silver emblem, ember/purple reactive glow, grille depth, top labels, vents and a more aggressive control face. The emblem is bundled as `Source/ui/abyss_logo.png` and served through the JUCE WebView resource provider.


## 1.7.0 UI / synth fix
The ABYSS emblem is integrated as an engraved metal treatment across the interface. The synth ON/OFF state bridge is fixed and all synth parameters are now included in the WebView parameter table.


## 1.8.0 Guitar AutoTune / Scale Lock

- Added a dedicated forged-metal ABYSS AutoTune page with the same UI language as the amp, synth, cab and EQ.
- Added key selection for all 12 chromatic roots.
- Added Major, Natural Minor, Dorian, Mixolydian, Phrygian and Phrygian Dominant scale maps.
- Added Speed, Amount, Humanize, Mix and Tracking controls.
- Added real-time detected-note, frequency, target-frequency and cents readouts.
- Added ten scale-focused factory AutoTune presets.
- The correction engine is optimized for monophonic guitar lines, sustained notes, vibrato and leads; chords are deliberately treated conservatively.
