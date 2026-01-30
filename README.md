# Frontend-Assignment-24-Hour-Story-Feature-Instagram-like-


A **client-side Instagram-style stories feature** built with **React** and **Tailwind CSS**. Users can add stories, view them in full-screen, and stories automatically expire after 24 hours. All data is stored in **localStorage**—no backend required.


## Tech Stack

- React
- Vite
- Local Storage API
- Modern JavaScript (ES6+)

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`


## ✅ Features

- Users can **add a new story** by uploading an image from their device.
- Uploaded images are:
  - Resized to a maximum of **1080px x 1920px**.
  - Converted to **Base64 format** for storage.
- Stories are **stored in browser localStorage**.
- Each story **expires automatically after 24 hours**.
- Clicking a story opens it in **full-screen mode**.
- Users can **navigate between stories**:
  - Using **next/previous buttons**.
  - Optional: swipe support (can be added later).
- Responsive design:
  - Works on **mobile, tablet, and desktop**.
- Clean and polished UI:
  - Loading states.
  - Empty state handling.
  - Story progress bar in full view.

---

## 📁 Project Structure

- **`src/`**
  - `App.jsx` → Main app component; handles state, story upload, resizing, scrolling.
  - `components/`
    - `StoryBar.jsx` → Shows story thumbnails in a horizontal scroll bar.
    - `StoryViewer.jsx` → Fullscreen story view with progress bar, next/prev navigation, and delete option.
  - `helper/`
    - `storyStorage.js` → Handles localStorage: get, save, and remove expired stories.
  - `index.css` → Tailwind CSS and custom scrollbar hiding.
  - `index.js` → React entry point.

---

## 💾 Data Structure

Each story stored in **localStorage** contains:

- `id` → Unique identifier (timestamp of creation)
- `imageBase64` → Image data in Base64 format
- `createdAt` → Timestamp when the story was added
- `expiresAt` → Timestamp when the story expires (24 hours later)

Example:

```json
{
  "id": 1670000000000,
  "imageBase64": "data:image/jpeg;base64,...",
  "createdAt": 1670000000000,
  "expiresAt": 1670086400000
}
```
