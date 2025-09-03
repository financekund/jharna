// src/api/tmdb.js
export async function fetchMoviesByCategory(language, page = 1) {
  try {
    const res = await fetch(`/api/tmdb?language=${language}&page=${page}`);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching movies:", err);
    return { results: [], total_pages: 1 };
  }
}
