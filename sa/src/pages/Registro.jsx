import React from 'react';
import './Login.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      <header className="header">
        <h1 className="logo">Avalia+</h1>
      </header>
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
            <label className="remember-me">
              <input type="checkbox" />
              Lembre de mim
            </label>

          </div>
          <button type="submit" className="login-button">
            Sign in
          </button>
        </form>
        <p className="register-link">
          Já possui conta?{' '}
          
        </p>
      </main>
    </div>
  );
};

export default LoginPage;