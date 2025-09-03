import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            language: 'hi-IN' // Hindi detail (अगर Hindi में available है)
          }
        });
        setMovie(res.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="details-page" style={{ padding: '20px' }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '20px', color: '#00f' }}>← Back</Link>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ width: '300px', borderRadius: '8px' }}
        />
        <div style={{ maxWidth: '600px' }}>
          <h1>{movie.title}</h1>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}</p>
          <p>{movie.overview}</p>

          <a
            href="#"
            style={{
              display: 'inline-block',
              marginTop: '20px',
              padding: '10px 20px',
              background: '#ff5722',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '5px'
            }}
          >
            Download (Manual Link)
          </a>
        </div>
      </div>
    </div>
  );
}
