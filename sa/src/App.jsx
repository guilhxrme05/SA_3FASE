import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routes'; // Importa o roteador de routes.jsx

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;