# Specification

## Summary
**Goal:** Add optional, built-in soothing background music playback in the app with accessible controls and locally persisted settings.

**Planned changes:**
- Add a calming audio file to the frontend static assets and play it via the browser audio API (no backend involvement).
- Add Play/Pause and volume controls to the main app UI (e.g., top navigation) with clear English labels and keyboard/ARIA accessibility.
- Default music to off/muted until the user starts playback, persist play state and volume locally in the browser, and handle browser autoplay restrictions with a non-blocking user message.

**User-visible outcome:** Users can start/stop soothing background music and adjust volume; the app remembers their music and volume settings across reloads and won’t auto-play on first visit.
