import React, { useEffect, useState } from 'react'
import { DiscordSDK } from '@discord/embedded-app-sdk'
import { Search, Star, Info, X } from 'lucide-react'
import './App.css'

// Initialize Discord SDK
let discordSdk = null;
try {
  discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
} catch (e) {
  console.log("Not running in Discord environment or missing Client ID");
}

function App() {
  const [isDiscordReady, setIsDiscordReady] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [topAnime, setTopAnime] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedAnime, setSelectedAnime] = useState(null)

  useEffect(() => {
    async function setupDiscord() {
      if (discordSdk) {
        try {
          await discordSdk.ready();
          setIsDiscordReady(true);
        } catch (e) {
          console.error("Discord SDK Ready Error", e);
          setIsDiscordReady(true);
        }
      } else {
        setIsDiscordReady(true);
      }
    }
    setupDiscord();
    fetchTopAnime();
  }, [])

  const fetchTopAnime = async () => {
    try {
      const res = await fetch('/api/mal?action=top')
      const data = await res.json()
      if (data && data.length > 0) setTopAnime(data)
    } catch (e) {
      console.error("Failed to fetch top anime", e)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }
    setIsSearching(true)
    try {
      const res = await fetch(`/api/mal?action=search&q=${encodeURIComponent(searchQuery)}`)
      const data = await res.json()
      setSearchResults(data || [])
    } catch (error) {
      console.error('Error fetching search results:', error)
    } finally {
      setIsSearching(false)
    }
  }

  if (!isDiscordReady) {
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#fff'}}>Loading...</div>
  }

  const heroAnime = topAnime.length > 0 ? topAnime[0] : null;
  const trendingAnime = topAnime.slice(1);

  return (
    <div className="app-container">
      
      {/* Search Header */}
      <div className="search-container">
        <h2 style={{margin: 0, color: 'var(--discord-orange)', fontWeight: 900, fontStyle: 'italic', marginRight: 'auto'}}>MAL EXPLORER</h2>
        <form onSubmit={handleSearch} style={{display: 'flex', gap: '10px', width: '100%', maxWidth: '400px'}}>
          <input
            type="text"
            className="search-input"
            placeholder="Search anime..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button" disabled={isSearching}>
            {isSearching ? '...' : <Search size={20} />}
          </button>
        </form>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        
        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="carousel-section">
            <h2 className="carousel-title">Search Results</h2>
            <div className="carousel">
              {searchResults.map((anime, idx) => (
                <div key={idx} className="anime-card" onClick={() => setSelectedAnime(anime)}>
                  <img src={anime.image} alt={anime.title} className="anime-poster" loading="lazy" />
                  <div className="anime-card-overlay">
                    <div className="score-badge"><Star size={14} style={{display: 'inline', marginBottom: '-2px'}}/> {anime.score}</div>
                    <span style={{fontWeight: 'bold'}}>{anime.type}</span>
                    <span style={{fontSize: '0.9rem', marginTop: '0.5rem'}}>{anime.status}</span>
                  </div>
                  <div className="anime-card-title">{anime.title}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hero Banner (Only show if not searching or if search results are empty) */}
        {heroAnime && searchResults.length === 0 && (
          <div className="hero-banner" style={{ backgroundImage: `url(${heroAnime.image})` }}>
            <div className="hero-gradient"></div>
            <div className="hero-content">
              <h1 className="hero-title">{heroAnime.title}</h1>
              <div className="score-badge" style={{display: 'inline-block', fontSize: '1.2rem', marginBottom: '1rem'}}>
                <Star size={18} style={{display: 'inline', marginBottom: '-3px'}}/> {heroAnime.score}
              </div>
              <p className="hero-synopsis">{heroAnime.synopsis}</p>
              <button className="search-button" style={{marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '8px'}} onClick={() => setSelectedAnime(heroAnime)}>
                <Info size={20} /> View Details
              </button>
            </div>
          </div>
        )}

        {/* Trending Carousel */}
        {trendingAnime.length > 0 && searchResults.length === 0 && (
          <div className="carousel-section">
            <h2 className="carousel-title">Top Airing This Season</h2>
            <div className="carousel">
              {trendingAnime.map((anime, idx) => (
                <div key={idx} className="anime-card" onClick={() => setSelectedAnime(anime)}>
                  <img src={anime.image} alt={anime.title} className="anime-poster" loading="lazy" />
                  <div className="anime-card-overlay">
                    <div className="score-badge"><Star size={14} style={{display: 'inline', marginBottom: '-2px'}}/> {anime.score}</div>
                    <button className="search-button" style={{padding: '0.5rem 1rem', marginTop: '1rem'}}>Details</button>
                  </div>
                  <div className="anime-card-title">{anime.title}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Details Modal */}
      {selectedAnime && (
        <div className="modal-overlay" onClick={() => setSelectedAnime(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedAnime(null)}><X size={24} /></button>
            <div className="modal-header">
              <img src={selectedAnime.image} alt={selectedAnime.title} className="modal-poster" />
              <div className="modal-info">
                <h1>{selectedAnime.title}</h1>
                <div className="modal-meta">
                  <span><Star size={14} style={{display: 'inline', marginBottom: '-2px'}}/> {selectedAnime.score} Score</span>
                  {selectedAnime.status && <span>{selectedAnime.status}</span>}
                  {selectedAnime.type && <span>{selectedAnime.type}</span>}
                </div>
                {selectedAnime.synopsis ? (
                  <p className="modal-synopsis">{selectedAnime.synopsis}</p>
                ) : (
                  <p className="modal-synopsis">Additional details are available on MyAnimeList. This series is currently highly rated by the community!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
