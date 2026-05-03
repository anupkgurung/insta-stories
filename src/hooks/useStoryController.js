import { useState, useEffect } from "react";

export function useStoryController() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/stories.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStories(data);
      } catch (err) {
        setError(err.message || "Failed to fetch stories");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return {
    stories,
    loading,
    error,
    isViewerOpen,
    setIsViewerOpen,
    currentStoryIndex,
    setCurrentStoryIndex,
  };
}
