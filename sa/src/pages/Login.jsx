import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './Login.css';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const success = login(formData);
    if (success) {
      navigate('/'); 
    }
  };

  return (
    <div className="login-container">
      <Link to="/">
        <header className="header">
          <h1 className=               "logo">Avalia+</h1>
        </header>
      </Link>
      <main className="login-content">
        <h2 className="title-login">Faça login em sua conta</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Digite seu nome"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="login-button">Sign in</button>
        </form>
        <Link to="/registro">
          <p className="register-link">Ainda não tem conta?</p>
        </Link>
      </main>
    </div>
  );
};

export default LoginPage;