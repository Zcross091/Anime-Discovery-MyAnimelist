import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getAnimeDetails } from '../api';
import { Play, ArrowLeft, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

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
  if (!anime) return <div style={{padding: '4rem', textAlign: 'center'}}>Record Not Found.</div>;

  const streamLinks = anime.streaming || [];
  const pageTitle = `${anime.title_english || anime.title} - Where to Watch Legally`;
  const metaDesc = anime.synopsis ? anime.synopsis.substring(0, 150) + '...' : `Find out where to watch ${anime.title} legally.`;
  
  return (
    <motion.div 
      className="immersive-layout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDesc} />
      </Helmet>

      {/* Immersive Background */}
      <div className="immersive-bg">
        <img src={anime.images.webp.large_image_url} alt="Background" />
      </div>

      <div style={{ padding: '2rem 4rem', position: 'relative', zIndex: 10 }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
          <ArrowLeft size={18} /> Return to Hub
        </Link>

        <div className="detail-content-wrapper">
          <motion.div 
            className="detail-poster-container"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <img src={anime.images.webp.large_image_url} alt={anime.title} />
          </motion.div>
          
          <motion.div 
            className="detail-text"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h1 style={{ marginBottom: '1rem' }}>{anime.title_english || anime.title}</h1>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <span style={{ background: 'var(--bg-surface)', padding: '0.4rem 1rem', borderRadius: '100px', fontSize: '0.9rem', border: '1px solid var(--border-subtle)' }}>
                {anime.status}
              </span>
              <span style={{ background: 'var(--bg-surface)', padding: '0.4rem 1rem', borderRadius: '100px', fontSize: '0.9rem', border: '1px solid var(--border-subtle)' }}>
                {anime.year || 'TBA'}
              </span>
              <span style={{ background: 'var(--bg-surface)', padding: '0.4rem 1rem', borderRadius: '100px', fontSize: '0.9rem', border: '1px solid var(--border-subtle)', color: 'var(--accent-color)', fontWeight: '600' }}>
                Score: {anime.score || 'N/A'}
              </span>
            </div>

            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', maxWidth: '800px', marginBottom: '3rem' }}>
              {anime.synopsis}
            </p>

            <h3 style={{ marginBottom: '1.5rem', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '1rem', color: 'var(--text-secondary)' }}>
              Official Streams
            </h3>
            
            {streamLinks.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
                {streamLinks.map((stream, idx) => (
                  <a href={stream.url} target="_blank" rel="noopener noreferrer" className="stream-card" key={idx}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: '600' }}>
                      <Play size={20} color="var(--text-primary)" />
                      {stream.name}
                    </div>
                    <ExternalLink size={16} color="var(--text-secondary)" />
                  </a>
                ))}
              </div>
            ) : (
              <div style={{ background: 'var(--bg-surface)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', maxWidth: '500px' }}>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
                  No official streaming links are currently listed for this region. Please check local distributors.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
