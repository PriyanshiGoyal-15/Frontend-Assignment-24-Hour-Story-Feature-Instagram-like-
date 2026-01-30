import React from "react";

export default function StoryBar({ stories, onOpen }) {
  return (
    <>
      {stories.map((story, index) => (
        <div
          key={story.id}
          onClick={() => onOpen(index)}
          className="flex flex-col items-center cursor-pointer shrink-0"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-linear-to-tr from-pink-500 to-yellow-400 p-0.5 flex items-center justify-center">
            <img
              src={story.imageBase64}
              alt={`Story ${index + 1}`}
              className="w-full h-full rounded-full object-cover bg-white"
            />
          </div>

          <span className="text-xs sm:text-sm mt-1 text-gray-600 text-center">
            Story
          </span>
        </div>
      ))}
    </>
  );
}
