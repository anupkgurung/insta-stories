import { useStoryController } from "./hooks/useStoryController";
import "./index.css";

function App() {
  const {
    stories,
    loading,
    error,
    isViewerOpen,
    setIsViewerOpen,
    currentStoryIndex,
    setCurrentStoryIndex,
  } = useStoryController();

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <div className="spinner"></div>
        <p>Loading stories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Insta Stories</h1>
      <p>Stories loaded: {stories.length}</p>
      <div style={{ marginTop: "20px" }}>
        {stories.map((story) => (
          <div key={story.id} style={{ marginBottom: "10px" }}>
            Story {story.id}: {story.imageUrl}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
