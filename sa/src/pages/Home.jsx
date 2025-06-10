import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import { BsCameraReelsFill } from "react-icons/bs";
import { LuJoystick } from "react-icons/lu";
import { FaGraduationCap } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";
import { MdAttachMoney } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

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
      setPlataformas(response.data);
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
        <button
          className={`filter-btn ${filter === 'Todos' ? 'selected' : ''}`}
          onClick={() => handleFilterChange('Todos')}
        >
          Todos
        </button>
        <button
          className={`filter-btn ${filter === 'Streaming' ? 'selected' : ''}`}
          onClick={() => handleFilterChange('Streaming')}
        >
          <BsCameraReelsFill /> Streaming
        </button>
        <button
          className={`filter-btn ${filter === 'Jogos' ? 'selected' : ''}`}
          onClick={() => handleFilterChange('Jogos')}
        >
          <LuJoystick /> Jogos
        </button>
        <button
          className={`filter-btn ${filter === 'Educação' ? 'selected' : ''}`}
          onClick={() => handleFilterChange('Educação')}
        >
          <FaGraduationCap /> Educação
        </button>
        <button
          className={`filter-btn ${filter === 'Música' ? 'selected' : ''}`}
          onClick={() => handleFilterChange('Música')}
        >
          <FaMusic /> Música
        </button>
        <button
          className={`filter-btn ${filter === 'Social' ? 'selected' : ''}`}
          onClick={() => handleFilterChange('Social')}
        >
          <IoIosChatboxes /> Social
        </button>
        <button
          className={`filter-btn ${filter === 'Financeiro' ? 'selected' : ''}`}
          onClick={() => handleFilterChange('Financeiro')}
        >
          <MdAttachMoney /> Financeiro
        </button>
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
              <div className="app-description">{plataforma.descricao}</div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;