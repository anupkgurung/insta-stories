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

### Refactor: Modular Code Structure
Moved controller logic from App.jsx to `src/hooks/useStoryController.js`:
- Created custom hook `useStoryController` to separate logic from view
- App.jsx now only handles rendering (view layer)
- Hook returns state and setters: `stories`, `loading`, `error`, `isViewerOpen`, `setIsViewerOpen`, `currentStoryIndex`, `setCurrentStoryIndex`
- This separation improves maintainability and follows React best practices

---

## Phase 4: Components Implementation ✅ (Done)

### What was done
1. **Created shared components:**
   - `LoadingSpinner`: Pure CSS spinner using keyframe animation
   - `ErrorMessage`: Displays error text with red styling

2. **StoryList Component:**
   - Horizontal scrollable list with `overflow-x: auto`
   - Shows users (not individual stories) with circular thumbnails
   - Uses first story image as user thumbnail (`user.stories[0].imageUrl`)
   - Displays username below each circular thumbnail
   - Hide scrollbar with `::-webkit-scrollbar { display: none }`

3. **StoryViewer Component:**
   - Full-screen fixed overlay (black background, z-index 999)
   - **Navigation**: Two transparent 50% width zones (left = previous, right = next)
   - **Auto-advance**: 5-second `setTimeout`, cleared/reset on story change
   - **Image loading**: Uses `loadedStoryId` state to track which story's image loaded
   - **Loading logic**: `isImageLoading = loadedStoryId !== currentStory.id`
   - **Image key prop**: `key={currentStory.id}` forces React to remount `<img>` on story change
   - **Progress bar**: Shows active/completed segments with 5s CSS animation
   - **Close button**: Top-right X button to exit viewer

4. **Data Structure Update:**
   - `stories.json` now has user-based structure with `username` and `stories` array
   - 5 users, each with 2-4 stories
   - Controller updated to manage `users`, `selectedUserIndex`, `currentStoryIndex`

5. **CSS Styles:**
   - Spinner animation with `transform: rotate()` keyframes
   - Story list: flexbox with gap, circular thumbnails with border
   - Story viewer: full-screen, centered image with `object-fit: contain`
   - Navigation zones: absolute positioned, 50% width each
   - Progress bar with CSS animation for 5s timer

### Why
- Component separation makes code modular and maintainable
- User-based structure matches Instagram's UI (users have multiple stories)
- `loadedStoryId` approach fixes race condition in image loading state
- `key={currentStory.id}` ensures `onLoad` fires for each new image
- 5s auto-advance with timer cleanup prevents memory leaks
- CSS-only transitions avoid external animation libraries
