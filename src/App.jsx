import { useStoryController } from "./hooks/useStoryController";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import StoryList from "./components/StoryList";
import StoryViewer from "./components/StoryViewer";
import "./index.css";

function App() {
  const {
    users,
    loading,
    error,
    isViewerOpen,
    setIsViewerOpen,
    selectedUserIndex,
    setSelectedUserIndex,
    currentStoryIndex,
    setCurrentStoryIndex,
  } = useStoryController();

  const handleUserClick = (index) => {
    setSelectedUserIndex(index);
    setCurrentStoryIndex(0);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
  };

  const handlePrevious = () => {
    setCurrentStoryIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    const currentUser = users[selectedUserIndex];
    if (currentStoryIndex === currentUser.stories.length - 1) {
      // If last story of current user, close viewer
      setIsViewerOpen(false);
    } else {
      setCurrentStoryIndex((prev) => prev + 1);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <LoadingSpinner />
        <p>Loading stories...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Insta Stories</h1>
      <StoryList users={users} onUserClick={handleUserClick} />
      {isViewerOpen && (
        <StoryViewer
          stories={users[selectedUserIndex].stories}
          currentStoryIndex={currentStoryIndex}
          onClose={handleCloseViewer}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </div>
  );
}

export default App;
