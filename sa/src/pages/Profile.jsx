import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './Profile.css';

const ProfilePage = () => {
  const { user, updateProfile, deleteAccount, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });
  const navigate = useNavigate();

 
  useEffect(() => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      password: '',
    });
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const success = await updateProfile(formData);
    if (success) {
      setIsEditing(false);
      alert('Perfil atualizado com sucesso!');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Tem certeza que deseja deletar sua conta? Esta ação é irreversível.')) {
      const success = await deleteAccount();
      if (success) {
        logout(); 
        alert('Conta deletada com sucesso!');
        navigate('/'); 
      }
    }
  };

  return (
    <div className="profile-container">
      <Link to="/">
        <header className="header">
          <h1 className="logo">Avalia+</h1>
        </header>
      </Link>
      <main className="profile-content">
        <div className="profile-header">
          <div className="profile-photo" />
          <button className="edit-button" onClick={handleEditClick}>
            ✏️
          </button>
        </div>
        <form className="profile-form" onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Digite uma nova senha (opcional)"
            />
          </div>
          {isEditing && (
            <button type="submit" className="save-button">
              Salvar
            </button>
          )}
        </form>
        <button className="delete-button" onClick={handleDeleteAccount}>
          Deletar Conta
        </button>
      </main>
    </div>
  );
};

export default ProfilePage;