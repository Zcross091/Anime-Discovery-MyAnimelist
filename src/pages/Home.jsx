import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchTrendingAnime, searchAnime } from '../api';
import { Star } from 'lucide-react';

export default function Home() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      let data = [];
      if (query) {
        data = await searchAnime(query);
      } else {
        data = await fetchTrendingAnime();
      }
      setAnimes(data);
      setLoading(false);
    };
    
    loadData();
  }, [query]);

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>
        {query ? `Search Results for "${query}"` : 'Trending Now'}
      </h2>
      
      {animes.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>No anime found. Try another search!</p>
      ) : (
        <div className="anime-grid">
          {animes.map(anime => (
            <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id} className="anime-card">
              <img src={anime.images.webp.large_image_url} alt={anime.title} />
              <div className="anime-card-overlay">
                <div className="anime-card-title">{anime.title_english || anime.title}</div>
                <div className="anime-card-meta">
                  <span>{anime.year || 'N/A'} • {anime.type}</span>
                  <span className="score-badge">
                    <Star size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
                    {anime.score || 'N/A'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
