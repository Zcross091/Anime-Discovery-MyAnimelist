import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAnimeDetails } from '../api';
import { Play, ArrowLeft, ExternalLink } from 'lucide-react';

export default function Detail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      const data = await getAnimeDetails(id);
      setAnime(data);
      setLoading(false);
    };
    loadDetails();
  }, [id]);

  if (loading) return <div className="loader"><div className="spinner"></div></div>;
  if (!anime) return <div style={{padding: '2rem', textAlign: 'center'}}>Anime not found.</div>;

  // Filter streaming links specifically for legal platforms
  const streamLinks = anime.streaming || [];
  
  return (
    <div className="animate-fade-in">
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        <ArrowLeft size={20} /> Back to Discover
      </Link>

      <div className="hero-banner">
        <img src={anime.images.webp.large_image_url} alt="banner" />
      </div>

      <div className="detail-container">
        <img src={anime.images.webp.large_image_url} alt={anime.title} className="detail-poster" />
        
        <div className="detail-content">
          <h1 className="detail-title gradient-text">{anime.title_english || anime.title}</h1>
          <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            <span className="glass-panel" style={{ padding: '0.3rem 0.8rem', borderRadius: '20px' }}>{anime.status}</span>
            <span className="glass-panel" style={{ padding: '0.3rem 0.8rem', borderRadius: '20px' }}>{anime.episodes} Episodes</span>
            <span className="glass-panel" style={{ padding: '0.3rem 0.8rem', borderRadius: '20px' }}>Rating: {anime.score}/10</span>
          </div>

          <p className="detail-synopsis">{anime.synopsis}</p>

          <div className="watch-section">
            <h3>Where to Watch (Legal Streams)</h3>
            {streamLinks.length > 0 ? (
              <div className="stream-grid">
                {streamLinks.map((stream, idx) => (
                  <a href={stream.url} target="_blank" rel="noopener noreferrer" className="stream-btn" key={idx}>
                    <Play size={18} />
                    {stream.name}
                    <ExternalLink size={14} style={{ opacity: 0.5, marginLeft: 'auto' }} />
                  </a>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', marginTop: '1rem', padding: '1rem', background: 'var(--bg-glass)', borderRadius: '8px' }}>
                No official streaming links found for your region. Try searching on Crunchyroll or Netflix directly.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
