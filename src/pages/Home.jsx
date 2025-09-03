import React, { useEffect, useState } from 'react';
import MovieGrid from '../components/MovieGrid';
import MovieCard from '../components/MovieCard';
import { fetchMoviesByCategory } from '../api/tmdb';

// Reusable component for each category
function CategorySection({ title, lang }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMoviesByCategory(lang, page).then(data => {
      setMovies(data.results);
      setTotalPages(data.total_pages);
    });
  }, [lang, page]);

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const total = Math.min(totalPages, 5); // show max 5 pages
    let start = Math.max(page - 2, 1);
    let end = start + total - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - total + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <section className="section" style={{ marginBottom: '40px' }}>
      <h2 style={{ fontSize: '22px', marginBottom: '16px' }}>{title}</h2>
      <MovieGrid>
        {movies.map(m => <MovieCard key={m.id} movie={m} />)}
      </MovieGrid>

      {/* Pagination */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '20px',
        flexWrap: 'wrap'
      }}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          style={styles.pageBtn}
        >
          Prev
        </button>
        {getPaginationNumbers().map(num => (
          <button
            key={num}
            onClick={() => setPage(num)}
            style={{
              ...styles.pageBtn,
              backgroundColor: page === num ? '#25c2a0' : '#fff',
              color: page === num ? '#fff' : '#000'
            }}
          >
            {num}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          style={styles.pageBtn}
        >
          Next
        </button>
      </div>
    </section>
  );
}

// Button styles
const styles = {
  pageBtn: {
    border: '1px solid #ccc',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    background: '#fff',
    transition: '0.3s',
    fontWeight: '500'
  }
};

export default function Home() {
  return (
    <>
      <CategorySection title="Bollywood (Hindi)" lang="hi" />
      <CategorySection title="Hollywood (Hindi Dubbed)" lang="en" />
      <CategorySection title="Tollywood (Hindi Dubbed)" lang="te" />
    </>
  );
}
