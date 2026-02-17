# Specification

## Summary
**Goal:** Build the core “Ask Big Sister” advice Q&A app where authenticated users can post sensitive questions (optionally anonymously) and designated moderators can reply with empathetic answers.

**Planned changes:**
- Add Internet Identity sign-in and gate core features behind authentication.
- Implement question creation (title, details, optional “Post anonymously”) with backend persistence and a Home list of recent questions showing preview and answered/unanswered status.
- Implement question detail pages that display the question and its answers.
- Implement moderator-only answering workflow: backend authorization for answer creation; frontend “Add answer” form visible only to moderators.
- Add basic navigation: Home (recent), Ask (submit), About (supportive positioning text).
- Add safety/privacy UX copy: kindness guidance, “not a substitute for professional help,” and UI anonymity that hides author identity while retaining author principal in backend.
- Apply a cohesive warm, compassionate visual theme (non-blue/purple primary) consistently across all screens.
- Add generated static assets (logo + hero illustration) under `frontend/public/assets/generated` and render them in the header/home.

**User-visible outcome:** Signed-in users can browse recent questions, submit their own (optionally anonymous), and read compassionate answers; moderators can add answers within the app; the UI feels warm, supportive, and includes a logo and hero illustration.
