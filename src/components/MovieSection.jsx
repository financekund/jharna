import React, { useEffect, useState } from 'react';
import MovieGrid from './MovieGrid';
import MovieCard from './MovieCard';
import axios from 'axios';

export default function MovieSection({ title, language }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (pageNumber) => {
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          with_original_language: language,
          sort_by: 'popularity.desc',
          page: pageNumber
        }
      });
      setMovies(res.data.results);
      setTotalPages(res.data.total_pages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  return (
    <section className="section">
      <h2>{title}</h2>
      <MovieGrid>
        {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </MovieGrid>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '10px' }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {page}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </section>
  );
}
