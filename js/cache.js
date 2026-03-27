const CACHE = {
  get(input) {
    try {
      const key = CONFIG.CACHE_PREFIX + input.trim().toLowerCase();
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) { return null; }
  },
  set(input, data) {
    try {
      const key = CONFIG.CACHE_PREFIX + input.trim().toLowerCase();
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {}
  },
  has(input) {
    try {
      const key = CONFIG.CACHE_PREFIX + input.trim().toLowerCase();
      return localStorage.getItem(key) !== null;
    } catch (e) { return false; }
  },
  clear() {
    try {
      Object.keys(localStorage)
        .filter(k => k.startsWith(CONFIG.CACHE_PREFIX))
        .forEach(k => localStorage.removeItem(k));
    } catch (e) {}
  },
};