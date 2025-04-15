import React from 'react';
import './Registro.css';
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div className="login-container">
      <Link to="/">
      <header className="header">
        <h1 className="logo">Avalia+</h1>
      </header>
      </Link>
      <main className="login-content">
        <h2 className="title">Crie sua conta</h2>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              placeholder="Digite seu nome"
              className="form-input"
            />
          </div>


          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="e-mail">Email</label>
            <input
              type="e-mail"
              id="email"
              placeholder="Digite seu e-mail"
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
            Sign in
          </button>
        </form>
        <Link to="/login">
        <p className="register-link">
          Já possui conta?{' '}
          
        </p>
        </Link>
      </main>
    </div>
  );
};

export default LoginPage;