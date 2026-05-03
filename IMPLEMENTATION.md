# Insta Stories - Implementation Log

## Phase 1: Project Setup

### What was done
- Scaffolded React project using Vite with `npm create vite@latest insta-stories -- --template react`
- Removed unused default files: `App.css`, `assets/` folder
- Configured mobile-only viewport in `index.html`:
  - Added `maximum-scale=1.0, user-scalable=no` to prevent zooming
  - Removed favicon link (not needed for this app)
- Updated `src/index.css` with minimal global styles:
  - Reset margins/padding with `box-sizing: border-box`
  - Set `#root` max-width to 480px (standard mobile width) and centered it

### Why
- Vite provides fast dev server and minimal setup for React projects
- Mobile-only viewport ensures the app behaves like a native mobile app (no desktop scaling)
- Max-width 480px enforces mobile-only design as per requirements
- Cleanup reduces clutter and avoids broken imports

---

## Phase 2: External Stories Data

### What was done
- Created `public/stories.json` with 4 sample stories
- Each story object contains `id` and `imageUrl` (using picsum.photos for placeholder images)
- Images sized at 1080x1920 (vertical format typical for stories)

### Why
- External file allows easy story management without code changes
- `public/` folder ensures file is accessible via fetch API at `/stories.json`
- Placeholder images from picsum.photos require no setup or API keys
- Vertical image format (1080x1920) matches Instagram Stories aspect ratio

---

## Build Verification
- `npm run build` completed successfully
- No broken imports or missing files
- Dev server starts at `http://localhost:5173/`

---

## Phase 3: Core State & Data Fetching ✅ (Done)

### What was done
- Added state variables using React hooks:
  - `stories`: Array to store fetched stories (initial `[]`)
  - `loading`: Boolean for fetch state (initial `true`)
  - `error`: String for error messages (initial `null`)
  - `isViewerOpen`: Boolean to toggle story viewer (initial `false`)
  - `currentStoryIndex`: Integer for current story position (initial `0`)
- Implemented `useEffect` hook to fetch `/stories.json` on component mount
- Added try-catch-finally pattern for fetch with proper state updates
- Render logic: shows spinner during loading, error message on failure, story count when loaded

### Why
- Centralized state management in App component keeps data flow clear
- `useEffect` with empty dependency array ensures fetch runs once on mount
- Browser `fetch` API used (no axios/external libs as required)
- Loading/error states provide proper UX feedback during data fetching
