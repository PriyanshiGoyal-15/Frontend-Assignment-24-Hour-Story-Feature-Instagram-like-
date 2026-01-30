# Frontend-Assignment-24-Hour-Story-Feature-Instagram-like-

A React-based Instagram-like story feature with 24-hour expiration, built with Vite.

## Features

- Upload stories with automatic 24-hour expiration
- View stories in a full-screen viewer
- Delete stories
- Stories are stored locally in browser storage
- Responsive design

## Tech Stack

- React
- Vite
- Local Storage API
- Modern JavaScript (ES6+)

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## Usage

1. Click the "+" button to upload a new story
2. Stories automatically expire after 24 hours
3. Click on any story in the story bar to view it
4. Use the viewer to navigate between stories or delete them

## Project Structure

```
src/
├── App.jsx              # Main application component
├── components/
│   ├── StoryBar.jsx     # Story navigation bar
│   └── StoryViewer.jsx  # Full-screen story viewer
└── helper/
    └── storyStorage.js  # Local storage management
```
