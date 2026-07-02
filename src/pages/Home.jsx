import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchTrendingAnime, searchAnime, fetchUpcomingAnime, fetchCriticallyAcclaimed } from '../api';
import { motion } from 'framer-motion';

export default function Home() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [animes, setAnimes] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [acclaimed, setAcclaimed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      if (query) {
        const results = await searchAnime(query);
        setAnimes(results);
      } else {
        const [trendingData, upcomingData, acclaimedData] = await Promise.all([
          fetchTrendingAnime(),
          fetchUpcomingAnime(),
          fetchCriticallyAcclaimed()
        ]);
        setAnimes(trendingData);
        setUpcoming(upcomingData);
        setAcclaimed(acclaimedData);
      }
      setLoading(false);
    };
    
    loadData();
  }, [query]);

  if (loading) return <div className="loader"><div className="spinner"></div></div>;

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Helmet>
        <title>{query ? `Search: ${query} - Anime Discovery` : 'Home - Anime Discovery'}</title>
      </Helmet>

      {/* Cinematic Hero - Only show when NOT searching */}
      {!query && animes.length > 0 && (
        <motion.div 
          className="cinematic-hero"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img src={animes[0].images.webp.large_image_url} alt="Hero" />
          <div className="hero-overlay">
            <span className="hero-tag">#1 Trending Worldwide</span>
            <h1>{animes[0].title_english || animes[0].title}</h1>
            <p style={{ maxWidth: '600px', marginTop: '1rem', fontSize: '1.1rem' }}>
              {animes[0].synopsis ? animes[0].synopsis.substring(0, 150) + '...' : ''}
            </p>
            <Link to={`/anime/${animes[0].mal_id}`} className="premium-btn" style={{ marginTop: '2rem', width: 'fit-content' }}>
              Discover Now
            </Link>
          </div>
        </motion.div>
      )}

      {/* Main Grid */}
      <div className="section-title">
        <h2>{query ? `Search Results for "${query}"` : 'Trending Now'}</h2>
      </div>

      {animes.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)' }}>No anime found. Try another search!</p>
      ) : (
        <motion.div className="bento-grid" variants={container} initial="hidden" animate="show">
          {animes.slice(query ? 0 : 1).map((anime, idx) => {
            // Asymmetric Bento Sizing logic
            const colSpan = (idx % 5 === 0) ? 6 : (idx % 7 === 0) ? 8 : 4;
            const rowSpan = (idx % 3 === 0) ? 2 : 1;
            
            return (
              <motion.div 
                key={anime.mal_id} 
                variants={item}
                style={{ gridColumn: `span ${colSpan}`, gridRow: `span ${rowSpan}` }}
              >
                <Link to={`/anime/${anime.mal_id}`} className="bento-card" style={{ display: 'block', height: '100%' }}>
                  <img src={anime.images.webp.large_image_url} alt={anime.title} />
                  <div className="bento-overlay">
                    <div className="bento-title">{anime.title_english || anime.title}</div>
                    <div className="bento-meta">
                      <span>{anime.year || 'TBA'}</span>
                      <span style={{ color: 'var(--accent-color)', fontWeight: '600' }}>★ {anime.score || 'N/A'}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Critically Acclaimed & Upcoming (Only show on Home) */}
      {!query && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '4rem' }}>
          <div>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>Critically Acclaimed</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {acclaimed.map(anime => (
                <Link to={`/anime/${anime.mal_id}`} className="stream-card" key={anime.mal_id}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <img src={anime.images.webp.image_url} style={{ width: '50px', height: '70px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ fontWeight: '600' }}>{anime.title}</div>
                  </div>
                  <span style={{ color: 'var(--text-secondary)' }}>★ {anime.score}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>Upcoming Seasons</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {upcoming.map(anime => (
                <Link to={`/anime/${anime.mal_id}`} className="stream-card" key={anime.mal_id}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <img src={anime.images.webp.image_url} style={{ width: '50px', height: '70px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ fontWeight: '600' }}>{anime.title}</div>
                  </div>
                  <span style={{ color: 'var(--accent-color)' }}>Preview</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
