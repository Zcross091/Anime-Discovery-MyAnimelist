import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Search, MonitorPlay } from 'lucide-react';
import Home from './pages/Home';
import Detail from './pages/Detail';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <Link to="/" className="logo">
          <MonitorPlay size={28} color="var(--accent-1)" />
          <span>Anime<span className="gradient-text">Discovery</span></span>
        </Link>
        
        <form className="search-bar" onSubmit={handleSearch}>
          <Search size={20} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search for anime..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime/:id" element={<Detail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
