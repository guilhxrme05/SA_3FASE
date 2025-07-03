import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import { BsCameraReelsFill } from "react-icons/bs";
import { LuJoystick } from "react-icons/lu";
import { FaGraduationCap, FaMusic } from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";
import { MdAttachMoney } from "react-icons/md";


function StarRating({ rating }) {
  return (
    <div className="star-rating" style={{ display: 'flex', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            color: star <= rating ? '#ffc300' : '#ccc',
            fontSize: '20px',
            marginRight: 2,
          }}
        >
          ★
        </span>
      ))}
      <span style={{ fontSize: '14px', marginLeft: '6px', color: '#ccc' }}>
        ({rating?.toFixed(2) || '0.00'})
      </span>
    </div>
  );
}

function Home() {
  const [plataformas, setPlataformas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('Todos');

  useEffect(() => {
    fetchPlataformas();
  }, []);

  const fetchPlataformas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/plataformas');
      const plataformasData = response.data;

      const plataformasComMedia = await Promise.all(
        plataformasData.map(async (plataforma) => {
          try {
            const mediaRes = await axios.get(`http://localhost:5000/api/avaliacoes/media/${plataforma.id_plataforma}`);
            return {
              ...plataforma,
              rating: mediaRes.data.media_estrelas || 0,
            };
          } catch (err) {
            console.error(`Erro ao buscar média da plataforma ${plataforma.nome}:`, err);
            return {
              ...plataforma,
              rating: 0,
            };
          }
        })
      );

      setPlataformas(plataformasComMedia);
    } catch (error) {
      console.error('Erro ao carregar plataformas:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const filteredPlataformas = plataformas.filter((plataforma) => {
    const matchesSearch = plataforma.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'Todos' || plataforma.categoria === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="home-container">
      <header className="home-header">
        <Link to="/" className="logo">Avalia+</Link>
        <nav className="nav-links">
          <Link to="/Home">Menu</Link>
          <Link to="/perfil">Perfil</Link>
        </nav>
      </header>

      <input
        type="text"
        className="search-input"
        placeholder="Busque plataformas"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="filter-buttons">
        <button className={`filter-btn ${filter === 'Todos' ? 'selected' : ''}`} onClick={() => handleFilterChange('Todos')}>Todos</button>
        <button className={`filter-btn ${filter === 'Streaming' ? 'selected' : ''}`} onClick={() => handleFilterChange('Streaming')}><BsCameraReelsFill /> Streaming</button>
        <button className={`filter-btn ${filter === 'Jogos' ? 'selected' : ''}`} onClick={() => handleFilterChange('Jogos')}><LuJoystick /> Jogos</button>
        <button className={`filter-btn ${filter === 'Educação' ? 'selected' : ''}`} onClick={() => handleFilterChange('Educação')}><FaGraduationCap /> Educação</button>
        <button className={`filter-btn ${filter === 'Música' ? 'selected' : ''}`} onClick={() => handleFilterChange('Música')}><FaMusic /> Música</button>
        <button className={`filter-btn ${filter === 'Social' ? 'selected' : ''}`} onClick={() => handleFilterChange('Social')}><IoIosChatboxes /> Social</button>
        <button className={`filter-btn ${filter === 'Financeiro' ? 'selected' : ''}`} onClick={() => handleFilterChange('Financeiro')}><MdAttachMoney /> Financeiro</button>

      </div>

      <div className="cards-grid">
        {filteredPlataformas.length === 0 ? (
          <p>Nenhuma plataforma encontrada.</p>
        ) : (
          filteredPlataformas.map((plataforma) => (
            <Link
              to={`/review/${plataforma.id_plataforma}`}
              key={plataforma.id_plataforma}
              className="app-card"
              style={{ textDecoration: 'none' }}
            >
              <div
                className="app-logo"
                style={{ backgroundImage: `url(${plataforma.logo_url})` }}
              ></div>
              <div className="app-name">{plataforma.nome}</div>

              <StarRating rating={plataforma.rating || 0} />

              <div className="app-description">{plataforma.descricao}</div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
