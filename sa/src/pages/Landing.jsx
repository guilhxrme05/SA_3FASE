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
      
<div className="container">
  <button className="Btn instagram">
    <svg
      className="svgIcon"
      viewBox="0 0 448 512"
      height="1.5em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
      ></path>
    </svg>
    <span className="text">Instagram</span>
  </button>

  <button className="Btn spotify">
  <svg 
    className="svgIcon"
    xmlns="http://www.w3.org/2000/svg" 
    height="1.5em"
    viewBox="0 0 24 24">
    <path fill="currentColor" d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6c-.15-.5.15-1 .6-1.15c3.55-1.05 9.4-.85 13.1 1.35c.45.25.6.85.35 1.3c-.25.35-.85.5-1.3.25m-.1 2.8c-.25.35-.7.5-1.05.25c-2.7-1.65-6.8-2.15-9.95-1.15c-.4.1-.85-.1-.95-.5s.1-.85.5-.95c3.65-1.1 8.15-.55 11.25 1.35c.3.15.45.65.2 1m-1.2 2.75c-.2.3-.55.4-.85.2c-2.35-1.45-5.3-1.75-8.8-.95c-.35.1-.65-.15-.75-.45c-.1-.35.15-.65.45-.75c3.8-.85 7.1-.5 9.7 1.1c.35.15.4.55.25.85M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
    ></path>
  </svg>
    <span className="text">Spotify</span>
  </button>

  <button className="Btn netflix">
  <svg 
    className="svgIcon"
    xmlns="http://www.w3.org/2000/svg" 
    height="1.5em" 
    viewBox="0 0 32 32">
      <path fill="currentColor" d="m7.188.005l6.333 17.948v-.01l.5 1.411c2.786 7.88 4.281 12.104 4.286 12.109l.938.057c1.542.063 3.453.24 4.901.411c.333.042.62.052.641.042L17.928 12.52l-3.234-9.135A354 354 0 0 0 13.538.119l-.042-.12H7.194zm11.343.011l-.016 7.073l-.01 7.078l-.583-1.646l-.75 15.745c.74 2.089 1.135 3.203 1.141 3.208s.427.036.932.057c1.547.068 3.453.24 4.906.417c.333.036.625.052.641.036c.021-.01.026-7.224.026-16.01L24.808.016zM7.188.005v15.984c0 8.792.01 15.995.021 16.005s.552-.042 1.208-.115a55 55 0 0 1 2.01-.214c.693-.068 2.76-.203 3-.203c.068 0 .073-.359.083-6.771l.01-6.776l.505 1.417l.177.5l.76-15.734l-.255-.729L13.493.004z">
      </path>
  </svg>
    <span className="text">Netflix</span>
  </button>

  <button className="Btn hbo">
  <svg
    className="svgIcon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
    height="2.5em"
    fill="currentColor"
  >
    <g id="HBO">
      <path d="M13,12.07V25.85H9.2V20.77H6.79v5.08H3V12.07H6.79v5.24H9.2V12.07Zm17,4.11A2.82,2.82,0,1,0,32.81,19,2.82,2.82,0,0,0,30,16.18ZM30,12a7,7,0,0,0-6.41,4.17,3.83,3.83,0,0,0-1.08-3,4.63,4.63,0,0,0-3.37-1H13.8V25.88h5.33A4,4,0,0,0,22.18,25a4.38,4.38,0,0,0,1.28-3.46v0A7,7,0,1,0,30,12ZM19.66,22.36a1.24,1.24,0,0,1-.82.29H17.15v-2.1h1.69A1,1,0,0,1,20,21.62.94.94,0,0,1,19.66,22.36Zm0-5.07a1.16,1.16,0,0,1-.82.31h-1.7V15.42h1.67a1.36,1.36,0,0,1,.92.24,1.13,1.13,0,0,1,.27.86A1,1,0,0,1,19.67,17.29Zm1.94,1.63c.29-.18,1-.44,1.42-.72A7,7,0,0,0,23,19a5.33,5.33,0,0,0,.08,1A9,9,0,0,0,21.61,18.92ZM30,22.46A3.46,3.46,0,1,1,33.45,19,3.46,3.46,0,0,1,30,22.46Z"/>
      </g>
  </svg>
    <span className="text">HBO Max</span>
  </button>

    <button className="Btn aliexpress">
    <svg 
    className="svgIcon"
    xmlns="http://www.w3.org/2000/svg" 
    width={35} 
    height={35} 
    viewBox="0 0 48 48">
      <path fill="none" stroke="currenteColor" strokeLinecap="round" strokeLinejoin="round" d="M39.716 8.269a2.77 2.77 0 0 0-2.72-2.77h-26a2.77 2.77 0 0 0-2.73 2.77h0" strokeWidth={1}></path>
      <circle cx={13.126} cy={22.109} r={1.94} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}></circle><circle cx={34.855} cy={22.109} r={1.94} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}></circle><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M13.296 23.999c1.072 5.907 6.73 9.825 12.637 8.752A10.87 10.87 0 0 0 34.685 24" strokeWidth={1}></path><rect width={37} height={34.206} x={5.5} y={8.294} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" rx={4} ry={4} strokeWidth={1}></rect>
      </svg>

      <span className='text'>Aliexpress</span>

    </button>


</div>

    </div>
  );
};

export default HomePage;