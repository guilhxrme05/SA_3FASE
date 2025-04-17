import React from 'react';
import { Link } from 'react-router-dom'
import './Login.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      <Link to="/">
      <header className="header">
        <h1 className="logo">Avalia+</h1>
      </header>
      </Link>
      <main className="login-content">
        <h2 className="title-login">Faça login em sua conta</h2>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="name">Nome </label>
            <input
              type="text"
              id="name"
              placeholder="Digite seu nome"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha </label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              className="form-input"
            />
          </div>
          <div className="form-options">
            <label className="custom-checkbox">
              <input name="dummy" type="checkbox" />
              <span class="checkmark"></span>
              Lembre de mim
            </label>

          </div>
          <button type="submit" className="login-button">
           sign in
          </button>
        </form>
        <Link to="/registro">
        <p className="register-link">
          Ainda não tem conta?{' '}
          
        </p>
        </Link>
      </main>
    </div>
  );
};

export default LoginPage;