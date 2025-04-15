import React from 'react';
import { Link } from 'react-router-dom'
import './Landing.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="header">
        <h1 className="logo">Avalia+</h1>
      </header>
      <main className="main-content">
        <h2 className="title-landing">Avaliações de Plataformas Digital</h2>
        <p className="subtitle-landing">
          Explore análises detalhadas, compare funcionalidades e descubra opiniões reais de usuários sobre diversas plataformas digitais.
        </p>
        <Link to="/login">
        <button className="start-button">Comece aqui</button>
        </Link>
      </main>
      <footer className="footer">
        <div className="platforms">
          <span>MAX</span>
          <span>YouTube</span>
          <span>NETFLIX</span>
          <span>Spotify</span>
          <span>Aliexpress</span>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;