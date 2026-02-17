# Specification

## Summary
**Goal:** Replace the app’s background music with a soft flute track, attempt autoplay on load with graceful handling of browser restrictions, and persist music preferences across reloads.

**Planned changes:**
- Add a flute-based audio file as a static frontend public asset (e.g., under `/assets/audio/`) and update the background music logic to use it instead of the previous default track.
- On initial app load, attempt to start background music automatically (without requiring the user to open the music UI first).
- If autoplay is blocked, keep music off and show a clear English message instructing the user to press Play; if autoplay succeeds, ensure the UI reflects the playing state.
- Persist and restore both volume and play/pause state using the existing `localStorage` key `ask-big-sister-music-prefs`, remaining backward-compatible with previously stored volume-only data.

**User-visible outcome:** The app uses soft flute background music, tries to start it automatically on load, explains how to start it if autoplay is blocked, and remembers the user’s volume and play/pause choice after refresh.
