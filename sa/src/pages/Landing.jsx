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
      
<div class="container">
  <button class="Btn instagram">
    <svg
      class="svgIcon"
      viewBox="0 0 448 512"
      height="1.5em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
      ></path>
    </svg>
    <span class="text">Instagram</span>
  </button>

  <button class="Btn spotify">
  <svg 
    class="svgIcon"
    xmlns="http://www.w3.org/2000/svg" 
    height="1.5em"
    viewBox="0 0 24 24">
    <path fill="currentColor" d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6c-.15-.5.15-1 .6-1.15c3.55-1.05 9.4-.85 13.1 1.35c.45.25.6.85.35 1.3c-.25.35-.85.5-1.3.25m-.1 2.8c-.25.35-.7.5-1.05.25c-2.7-1.65-6.8-2.15-9.95-1.15c-.4.1-.85-.1-.95-.5s.1-.85.5-.95c3.65-1.1 8.15-.55 11.25 1.35c.3.15.45.65.2 1m-1.2 2.75c-.2.3-.55.4-.85.2c-2.35-1.45-5.3-1.75-8.8-.95c-.35.1-.65-.15-.75-.45c-.1-.35.15-.65.45-.75c3.8-.85 7.1-.5 9.7 1.1c.35.15.4.55.25.85M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
    ></path>
  </svg>
    <span class="text">Spotify</span>
  </button>

  <button class="Btn netflix">
  <svg 
    class="svgIcon"
    xmlns="http://www.w3.org/2000/svg" 
    height="1.5em" 
    viewBox="0 0 32 32">
      <path fill="currentColor" d="m7.188.005l6.333 17.948v-.01l.5 1.411c2.786 7.88 4.281 12.104 4.286 12.109l.938.057c1.542.063 3.453.24 4.901.411c.333.042.62.052.641.042L17.928 12.52l-3.234-9.135A354 354 0 0 0 13.538.119l-.042-.12H7.194zm11.343.011l-.016 7.073l-.01 7.078l-.583-1.646l-.75 15.745c.74 2.089 1.135 3.203 1.141 3.208s.427.036.932.057c1.547.068 3.453.24 4.906.417c.333.036.625.052.641.036c.021-.01.026-7.224.026-16.01L24.808.016zM7.188.005v15.984c0 8.792.01 15.995.021 16.005s.552-.042 1.208-.115a55 55 0 0 1 2.01-.214c.693-.068 2.76-.203 3-.203c.068 0 .073-.359.083-6.771l.01-6.776l.505 1.417l.177.5l.76-15.734l-.255-.729L13.493.004z">
      </path>
  </svg>
    <span class="text">Netflix</span>
  </button>
</div>

    </div>
  );
};

export default HomePage;