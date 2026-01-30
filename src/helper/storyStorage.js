const KEY = "stories";

export function getStories() {
    return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveStories(stories) {
    localStorage.setItem(KEY, JSON.stringify(stories));
}

export function removeExpiredStories() {
    const now = Date.now();
    const valid = getStories().filter((s) => s.expiresAt > now);
    saveStories(valid);
    return valid;
}
