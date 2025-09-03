// functions/api/tmdb.js
export async function onRequest(context) {
  const API_KEY = "1ea3ef491cb862f7564dbd0b19323bbc";
  const { searchParams } = new URL(context.request.url);

  const language = searchParams.get("language") || "hi";
  const page = searchParams.get("page") || 1;

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=${language}&sort_by=popularity.desc&page=${page}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ results: [], total_pages: 1, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
