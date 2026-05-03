# Insta Stories Project Plan

## Phase 1: Project Setup ✅ (Done)
- Scaffold Vite React project
- Remove unused files (App.css, assets/, vite.svg)
- Configure mobile viewport (no scaling, 480px max-width)
- Clean global CSS

## Phase 2: External Stories Data ✅ (Done)
- Create `public/stories.json` with 4 sample image stories
- Use vertical 1080x1920 placeholder images (picsum.photos)

## Phase 3: Core State & Data Fetching (Pending)
- App state: `stories`, `loading`, `error`, `isViewerOpen`, `currentStoryIndex`, timer ref
- Fetch `/stories.json` via browser `fetch` API in `useEffect`
- Handle loading/error states, retry logic

## Phase 4: Component Breakdown (Pending)
1. **StoryList**: Horizontal scrollable thumbnails, loading/error handling
2. **StoryViewer**: Full-screen overlay, left/right tap navigation, 5s auto-advance, image loading states
3. **Shared**: Pure CSS spinner, error message with retry

## Phase 5: Styling (Pending)
- Hide StoryList scrollbar, image `object-fit: contain`
- Enforce 480px mobile-only layout
- Optional story transition CSS

## Phase 6: Integration & Verification (Pending)
- Wire components in App.jsx
- Verify all requirements:
  ✅ Mobile-only, React only, no external core libs
  ✅ Horizontal scrollable story list from external file
  ✅ Tap to open, left/right navigation, 5s auto-advance
  ✅ Proper loading states, images only

## Phase 7: Test (Pending)
- Test all interactions: scroll, tap, navigation, auto-advance, error/retry
- Validate mobile layout
