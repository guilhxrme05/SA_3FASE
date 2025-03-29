import React from 'react';
import './Landing.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="header">
        <h1 className="logo">Avalia+</h1>
      </header>
      <main className="main-content">
        <h2 className="title">Avaliações de Plataformas Digital</h2>
        <p className="subtitle">
          Explore análises detalhadas, compare funcionalidades e descubra opiniões reais de usuários sobre diversas plataformas digitais.
        </p>
        <button className="start-button">COMECE AQUI</button>
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