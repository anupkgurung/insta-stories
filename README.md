# Insta Stories - Instagram Stories Clone

A simplified Instagram Stories feature built with React (mobile-only). View users' temporary image stories with auto-advance and tap navigation.

## Features

- **Mobile-Only Design**: Optimized for mobile devices (480px max-width)
- **User-Based Stories**: Horizontal scrollable list showing users with their story thumbnails
- **Full-Screen Viewer**: Tap to open stories in immersive full-screen mode
- **Navigation**: Tap left side (previous) or right side (next) to navigate between stories
- **Auto-Advance**: Stories automatically advance to the next after 5 seconds
- **Smooth Transitions**: Slide animations when navigating between stories
- **Loading States**: Proper spinners for data fetching and image loading
- **Progress Bar**: Visual indicator showing current story progress
- **No External Libraries**: Core functionality uses only React and browser APIs

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with animations and transitions
- **Browser Fetch API** - Data fetching (no axios)

## Project Structure

```
insta-stories/
├── public/
│   └── stories.json          # External stories data (users with their stories)
├── src/
│   ├── components/
│   │   ├── StoryList.jsx     # Horizontal scrollable user list
│   │   ├── StoryViewer.jsx   # Full-screen story viewer
│   │   ├── LoadingSpinner.jsx # CSS spinner component
│   │   └── ErrorMessage.jsx  # Error display component
│   ├── hooks/
│   │   └── useStoryController.js # State management & data fetching
│   ├── App.jsx               # Main app component (view layer)
│   ├── index.css             # Global styles and component styles
│   └── main.jsx              # Entry point
├── IMPLEMENTATION.md          # Detailed implementation log
├── PLAN.md                   # Project phases and progress
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

```bash
cd insta-stories
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:5173/ on your mobile device or use browser's mobile view.

### Build

```bash
npm run build
```

Output will be in the `dist/` folder.

## Data Structure

Stories are loaded from `public/stories.json`:

```json
[
  {
    "username": "user0",
    "stories": [
      { "id": 1, "imageUrl": "https://picsum.photos/seed/user0story1/1080/1920" },
      { "id": 2, "imageUrl": "https://picsum.photos/seed/user0story2/1080/1920" }
    ]
  }
]
```

- Each user has a `username` and `stories` array
- First story image is used as the user's thumbnail
- Images are vertical format (1080x1920) for story viewing

## How It Works

1. **Story List**: App fetches `stories.json` and displays users in a horizontal scrollable list
2. **Open Stories**: Tap on a user to open their stories in full-screen viewer
3. **Navigation**:
   - Tap left side → Previous story (if not first)
   - Tap right side → Next story (closes viewer if last story)
4. **Auto-Advance**: Stories auto-advance every 5 seconds
5. **Progress Bar**: Shows current story progress and completed stories
6. **Loading States**: Spinners shown while fetching data and loading images

## Implementation Phases

- ✅ **Phase 1**: Project setup with Vite React, mobile viewport config
- ✅ **Phase 2**: External stories data file (user-based structure)
- ✅ **Phase 3**: Core state management and data fetching (useStoryController hook)
- ✅ **Phase 4**: Components (StoryList, StoryViewer, LoadingSpinner, ErrorMessage)
- ✅ **Phase 5**: Styling (mobile-only, transitions, touch optimizations)
- ✅ **Phase 6**: Integration & verification (all requirements met)
- ✅ **Phase 7**: Testing (thorough testing of all interactions)

## Key Design Decisions

- **User-Based Structure**: Stories organized by users (like Instagram), not flat list
- **loadedStoryId Approach**: Fixed race condition in image loading state
- **key={currentStory.id}**: Forces React to remount image element on story change
- **Slide Transitions**: Optional requirement implemented with CSS animations
- **100dvh**: Dynamic viewport height for mobile browsers

## Browser Support

- Chrome/Safari/Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Touch-optimized with `touch-action: manipulation`

## License

MIT

## GitHub Repository

https://github.com/anupkgurung/insta-stories
