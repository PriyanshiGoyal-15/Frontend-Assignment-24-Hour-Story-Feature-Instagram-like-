import React, { useEffect, useState, useCallback, useRef } from "react";
import StoryBar from "./components/StoryBar";
import StoryViewer from "./components/StoryViewer";
import {
  getStories,
  saveStories,
  removeExpiredStories,
} from "./helper/storyStorage";

function resizeImage(file, maxWidth = 1080, maxHeight = 1920) {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      let { width, height } = img;

      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.7));
    };
  });
}

export default function App() {
  const [stories, setStories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const valid = removeExpiredStories();
    setStories(valid);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStories(removeExpiredStories());
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const checkScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        container.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [stories, checkScroll]);

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageBase64 = await resizeImage(file);
    const createdAt = Date.now();
    const newStory = {
      id: createdAt,
      imageBase64,
      createdAt,
      expiresAt: createdAt + 24 * 60 * 60 * 1000,
    };

    const updatedStories = [newStory, ...stories];
    saveStories(updatedStories);
    setStories(updatedStories);
  };

  const deleteStory = useCallback(
    (index) => {
      setStories((prev) => {
        const updated = prev.filter((_, i) => i !== index);
        saveStories(updated);
        if (activeIndex !== null && activeIndex >= updated.length) {
          setActiveIndex(updated.length ? updated.length - 1 : null);
        }
        return updated;
      });
    },
    [activeIndex],
  );

  const handleClose = useCallback(() => setActiveIndex(null), []);
  const handleChange = useCallback((newIndex) => setActiveIndex(newIndex), []);

  return (
    <div className="max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto bg-white min-h-screen">
      <div className="p-3 sm:p-4 font-semibold text-base sm:text-lg border-b">
        Stories
      </div>

      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all"
            aria-label="Scroll left"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all"
            aria-label="Scroll right"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <label className="flex flex-col items-center cursor-pointer shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gray-400 flex items-center justify-center text-2xl sm:text-3xl text-gray-600">
              +
            </div>
            <span className="text-xs sm:text-sm mt-1 text-gray-600 text-center">
              Your story
            </span>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleUpload}
            />
          </label>

          <StoryBar stories={stories} onOpen={setActiveIndex} />
        </div>
      </div>

      {activeIndex !== null && (
        <StoryViewer
          stories={stories}
          index={activeIndex}
          onClose={handleClose}
          onChange={handleChange}
          onDelete={deleteStory}
        />
      )}
    </div>
  );
}
