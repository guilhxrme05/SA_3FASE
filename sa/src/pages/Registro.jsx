import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './Registro.css';

const RegistroPage = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação simples antes de registrar
    if (!formData.name || !formData.email || !formData.password) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    register(formData); // Simula o registro
    navigate('/login'); // Redireciona para a tela de login
  };

  return (
    <div className="login-container">
      <Link to="/">
        <header className="header">
          <h1 className="logo">Avalia+</h1>
        </header>
      </Link>
      <main className="login-content">
        <h2 className="title">Crie sua conta</h2>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu e-mail"
              className="form-input"
              value={formData.email}
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
          <button type="submit" className="login-button">Registrar</button>
        </form>
        <Link to="/login">
          <p className="register-link">Já possui conta? Faça login</p>
        </Link>
      </main>
    </div>
  );
};

export default RegistroPage;