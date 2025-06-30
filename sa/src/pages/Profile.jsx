import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './Profile.css';
import { PiNotePencilLight } from "react-icons/pi";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';

const ProfilePage = () => {
  const { user, updateProfile, deleteAccount, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.nome || '',  // Corrigi para user.nome, que vem do backend
    email: user?.email || '',
    password: '',
  });
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [adminError, setAdminError] = useState('');


  const [avaliacoes, setAvaliacoes] = useState([]);

  // Para editar avaliações
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ rating: 0, comentario: '' });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: user?.nome || '',
      email: user?.email || '',
      password: '',
    });
  }, [user]);

  useEffect(() => {
    if (user?.id_usuario) {
      fetchAvaliacoesUsuario(user.id_usuario);
    }
  }, [user]);

  const fetchAvaliacoesUsuario = async (idUsuario) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/avaliacoes?usuario=${idUsuario}`);
      setAvaliacoes(response.data);
    } catch (error) {
      console.error('Erro ao carregar avaliações do usuário:', error);
    }
  };

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

  // Funções para edição das avaliações do usuário

  const startEditAvaliacao = (avaliacao) => {
    setEditId(avaliacao.id_avaliacao);
    setEditData({
      rating: avaliacao.estrelas,
      comentario: avaliacao.comentario || '',
    });
  };

  const handleEditRatingChange = (e) => {
    setEditData((prev) => ({
      ...prev,
      rating: parseInt(e.target.value),
    }));
  };

  const handleEditComentarioChange = (e) => {
    setEditData((prev) => ({
      ...prev,
      comentario: e.target.value,
    }));
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditData({ rating: 0, comentario: '' });
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/avaliacoes/${editId}`, {
        estrelas: editData.rating,
        comentario: editData.comentario,
      });
      alert('Avaliação atualizada com sucesso!');
      setEditId(null);
      setEditData({ rating: 0, comentario: '' });
      if (user?.id_usuario) {
        fetchAvaliacoesUsuario(user.id_usuario);
      }
    } catch (error) {
      console.error('Erro ao atualizar avaliação:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Erro ao atualizar avaliação');
    }
  };

  const handleDeleteAvaliacao = async (idAval) => {
    if (!window.confirm('Tem certeza que deseja excluir esta avaliação?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/avaliacoes/${idAval}`);
      alert('Avaliação excluída com sucesso!');
      if (user?.id_usuario) {
        fetchAvaliacoesUsuario(user.id_usuario);
      }
    } catch (error) {
      console.error('Erro ao excluir avaliação:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Erro ao excluir avaliação');
    }
  };
  const renderStars = (count) => {
    const maxStars = 5;
    const stars = [];
    // Garantir que count é number entre 0 e 5
    const n = Math.min(Math.max(Number(count), 0), maxStars);
  
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <span
          key={i}
          role="img"
          aria-label={i <= n ? 'estrela cheia' : 'estrela vazia'}
          style={{ color: i <= n ? '#FFD700' : '#CCC' }}
        >
          {i <= n ? '⭐' : '☆'}
        </span>
      );
    }
    return stars;
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
        <img
  src="/imgs/user.png"
  alt="Foto do usuário"
  className="profile-photo"
/>

          <button className="edit-button" onClick={handleEditClick}>
            <PiNotePencilLight />
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
              placeholder="Digite seu nome"
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
              placeholder="Digite seu email (Exemplo@gmail.com)"
            />
          </div>

          <div className="form-group password-group">
            <label htmlFor="password">Senha</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Digite uma nova senha (opcional)"
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </span>
            </div>
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
        <button
          className="logout-button"
          onClick={() => {
            logout();
            navigate('/');
          }}
        >
          Sair da Conta
        </button>
        <button
  className="logout-button"
  style={{ marginTop: '10px' }}
  onClick={() => setShowAdminInput(!showAdminInput)}
>
  Gerenciamento de Plataformas
</button>

{showAdminInput && (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      if (adminCode === '0000') {
        navigate('/plataformas'); // ajuste para a rota correta
      } else {
        setAdminError('Código incorreto');
      }
    }}
    style={{ marginTop: '10px' }}
  >
    <input
      type="password"
      placeholder="Digite o código"
      value={adminCode}
      onChange={(e) => {
        setAdminCode(e.target.value);
        setAdminError('');
      }}
      style={{
        padding: '8px',
        fontSize: '14px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        marginRight: '8px'
      }}
    />
    <button
      type="submit"
      style={{
        padding: '8px 14px',
        backgroundColor: '#646464',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
      }}
    >
      Entrar
    </button>
    {adminError && (
      <p style={{ color: 'red', marginTop: '5px' }}>{adminError}</p>
    )}
  </form>
)}


        {/* Lista de Avaliações do Usuário */}
        <section style={{ marginTop: '40px' }}>
          <h2>Minhas Avaliações</h2>
          {avaliacoes.length === 0 ? (
            <p>Você ainda não fez nenhuma avaliação.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {avaliacoes.map((av) => (
                <li
                  key={av.id_avaliacao}
                  style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    marginBottom: '10px',
                    position: 'relative',
                  }}
                >
                  {editId === av.id_avaliacao ? (
                    <>
                      <div>
                        <label>Nota:</label>
                        <div className="rating-stars-edit">
  {[5, 4, 3, 2, 1].map((num) => (
    <React.Fragment key={num}>
      <input
        type="radio"
        id={`editStar${num}`}
        name={`editRating-${av.id_avaliacao}`} // nome único para cada avaliação
        value={num}
        checked={editData.rating === num}
        onChange={() => setEditData(prev => ({ ...prev, rating: num }))}
      />
      <label htmlFor={`editStar${num}`}>★</label>
    </React.Fragment>
  ))}
</div>

                      </div>
                      <label style={{ marginTop: '10px', display: 'block' }}>
                        Comentário:
                      </label>
                      <input
                        type="text"
                        value={editData.comentario}
                        onChange={handleEditComentarioChange}
                        style={{ width: '100%', marginTop: '5px', fontSize: '16px', padding: '5px' }}
                      />
                      <div style={{ marginTop: '8px' }}>
                        <button
                          onClick={handleSaveEdit}
                          style={{ marginRight: '10px', cursor: 'pointer' }}
                        >
                          Salvar
                        </button>
                        <button onClick={handleCancelEdit} style={{ cursor: 'pointer' }}>
                          Cancelar
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <strong>{av.usuario_nome}</strong> — {renderStars(av.estrelas)}<br />

                      <br />
                      <em>{av.comentario || 'Sem comentário'}</em>

                      {/* Botões editar/excluir */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          display: 'flex',
                          gap: '8px',
                        }}
                      >
                        <button
                          onClick={() => startEditAvaliacao(av)}
                          style={{ cursor: 'pointer', fontSize: '12px', padding: '2px 6px' }}
                          title="Editar avaliação"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteAvaliacao(av.id_avaliacao)}
                          style={{ cursor: 'pointer', fontSize: '12px', padding: '2px 6px' }}
                          title="Excluir avaliação"
                        >
                          Excluir
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
