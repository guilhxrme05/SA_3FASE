import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { BsCameraReelsFill } from "react-icons/bs";
import { LuJoystick } from "react-icons/lu";
import { FaGraduationCap } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";
import { MdAttachMoney } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";

function Home() {
  return (
    <div className="home-container">
      {/* topo */}
      <header className="home-header">
        <Link to="/" className="logo">Avalia+</Link>
        <nav className="nav-links">
          <Link to="/Home">menu</Link>
          <Link to="/perfil">Perfil</Link>
        </nav>
      </header>

        <input
        type="text"
        className="search-input"
        placeholder="Busque plataformas"
        startad
        />

      {/* filtros */}
      <div className="filter-buttons">
        <button className="filter-btn selected">Todos</button>
        <button className="filter-btn"><BsCameraReelsFill /> Streaming</button>
        <button className="filter-btn"><LuJoystick /> Jogos</button>
        <button className="filter-btn"><FaGraduationCap /> Educação</button>
        <button className="filter-btn"><FaMusic /> Música</button>
        <button className="filter-btn"><IoIosChatboxes /> Social</button>
        <button className="filter-btn"><MdAttachMoney /> Financeiro</button>
      </div>

      {/* cards */}
      <div className="cards-grid">
        {Array.from({ length: 16 }).map((_, index) => (
          <div key={index} className="app-card">
            <div className="app-logo" />
            <div className="app-name">App/site</div>
            <div className="app-rating">★</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
