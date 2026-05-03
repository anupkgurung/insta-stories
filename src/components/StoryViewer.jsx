import { useState, useRef, useEffect } from "react";

function StoryViewer({ stories, currentStoryIndex, onClose, onPrevious, onNext }) {
  const [loadedStoryId, setLoadedStoryId] = useState(null);
  const [slideDirection, setSlideDirection] = useState(null);
  const timerRef = useRef(null);
  const prevIndexRef = useRef(currentStoryIndex);

  const currentStory = stories[currentStoryIndex];

  // Handle auto-advance
  useEffect(() => {
    // Clear previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set new timer for 5 seconds
    timerRef.current = setTimeout(() => {
      if (currentStoryIndex === stories.length - 1) {
        onClose();
      } else {
        setSlideDirection('left');
        onNext();
      }
    }, 5000);

    // Cleanup timer on unmount or index change
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentStoryIndex, stories.length, onClose, onNext]);

  // Track navigation direction
  useEffect(() => {
    if (prevIndexRef.current !== currentStoryIndex) {
      if (prevIndexRef.current < currentStoryIndex) {
        setSlideDirection('left');
      } else {
        setSlideDirection('right');
      }
      prevIndexRef.current = currentStoryIndex;
    }
  }, [currentStoryIndex]);

  const handleLeftTap = () => {
    if (currentStoryIndex > 0) {
      setSlideDirection('right');
      onPrevious();
    }
  };

  const handleRightTap = () => {
    if (currentStoryIndex === stories.length - 1) {
      onClose();
    } else {
      setSlideDirection('left');
      onNext();
    }
  };

  const handleImageLoad = () => {
    setLoadedStoryId(currentStory.id);
  };

  const handleImageError = () => {
    setLoadedStoryId(currentStory.id);
  };

  const isImageLoading = loadedStoryId !== currentStory.id;

  return (
    <div className="story-viewer">
      {/* Close button */}
      <button className="close-btn" onClick={onClose}>×</button>

      {/* Navigation zones */}
      <div className="nav-zone left" onClick={handleLeftTap}></div>
      <div className="nav-zone right" onClick={handleRightTap}></div>

      {/* Loading spinner */}
      {isImageLoading && (
        <div className="viewer-spinner">
          <div className="spinner"></div>
        </div>
      )}

      {/* Story image */}
      <img
        key={currentStory.id}
        src={currentStory.imageUrl}
        alt={`Story ${currentStory.id}`}
        className={`story-image ${slideDirection ? `slide-${slideDirection}` : ''}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ opacity: isImageLoading ? 0 : 1 }}
      />

      {/* Story progress indicator */}
      <div className="progress-bar">
        {stories.map((_, index) => (
          <div
            key={index}
            className={`progress-segment ${index === currentStoryIndex ? "active" : ""} ${index < currentStoryIndex ? "completed" : ""}`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default StoryViewer;
