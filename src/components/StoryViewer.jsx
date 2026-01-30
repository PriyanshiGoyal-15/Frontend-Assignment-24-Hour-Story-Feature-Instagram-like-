import React, { useEffect, useRef, useState } from "react";

export default function StoryViewer({
  stories,
  index,
  onClose,
  onChange,
  onDelete,
}) {
  const [progress, setProgress] = useState(0);
  const duration = 5000;
  const intervalRef = useRef(null);

  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percent = Math.min((elapsed / duration) * 100, 100);
      setProgress(percent);

      if (percent >= 100) {
        clearInterval(intervalRef.current);
        if (index < stories.length - 1) {
          onChange(index + 1);
        } else {
          onClose();
        }
      }
    }, 50);

    return () => clearInterval(intervalRef.current);
  }, [index, stories.length, onChange, onClose]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="absolute top-2 left-2 right-2 flex gap-1">
        {stories.map((_, i) => (
          <div key={i} className="flex-1 h-1 bg-gray-600 rounded">
            <div
              className="h-full bg-white rounded"
              style={{
                width: i < index ? "100%" : i === index ? `${progress}%` : "0%",
              }}
            />
          </div>
        ))}
      </div>

      <img
        src={stories[index].imageBase64}
        alt={`Story ${index + 1}`}
        className="max-h-full max-w-full object-contain"
      />

      <div className="absolute top-6 left-0 right-0 px-4 flex justify-between items-center">
        <span className="text-white text-xs">
          Story {index + 1} / {stories.length}
        </span>
        <div className="flex gap-2 sm:gap-4">
          <button
            onClick={() => onDelete(index)}
            className="text-red-400 text-xs sm:text-sm hover:text-red-300"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="text-white text-lg sm:text-xl hover:text-gray-300"
          >
            ✕
          </button>
        </div>
      </div>

      {index > 0 && (
        <button
          onClick={() => onChange(index - 1)}
          className="absolute left-2 sm:left-3 text-white text-3xl sm:text-4xl hover:text-gray-300"
        >
          ‹
        </button>
      )}
      {index < stories.length - 1 && (
        <button
          onClick={() => onChange(index + 1)}
          className="absolute right-2 sm:right-3 text-white text-3xl sm:text-4xl hover:text-gray-300"
        >
          ›
        </button>
      )}
    </div>
  );
}
