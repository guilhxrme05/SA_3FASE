import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import './PaginaReview.css';

function PaginaReview() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [plataforma, setPlataforma] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [rating, setRating] = useState(0);
  const [comentario, setComentario] = useState('');
  const [loading, setLoading] = useState(true);

  // Carrega dados da plataforma e avaliações
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [platRes, avalRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/plataformas/${id}`),
          axios.get(`http://localhost:5000/api/avaliacoes?plataforma=${id}`)
        ]);
        setPlataforma(platRes.data);
        setAvaliacoes(avalRes.data);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  // Função para enviar avaliação
  async function enviarAvaliacao() {
    if (!user) {
      alert('Você precisa estar logado para avaliar.');
      return;
    }
    if (!rating) {
      alert('Por favor, selecione uma nota.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/avaliacoes', {
        id_usuario: user.id_usuario,
        id_plataforma: plataforma.id_plataforma,
        estrelas: rating,
        comentario,
      });
      alert('Avaliação registrada com sucesso!');
      setRating(0);
      setComentario('');
      // Recarregar avaliações e plataforma para atualizar média
      const avalRes = await axios.get(`http://localhost:5000/api/avaliacoes?plataforma=${id}`);
      setAvaliacoes(avalRes.data);

      const platRes = await axios.get(`http://localhost:5000/api/plataformas/${id}`);
      setPlataforma(platRes.data);
    } catch (err) {
      console.error('Erro ao enviar avaliação:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Erro ao registrar avaliação');
    }
  }

  // Renderiza estrelas para avaliações exibidas
  const renderStars = (numStars) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= numStars ? '#FFD700' : '#ccc', fontSize: '18px' }}>
          {i <= numStars ? '⭐' : '☆'}
        </span>
      );
    }
    return stars;
  };

  if (loading) return <div>Carregando...</div>;
  if (!plataforma) return <div>Plataforma não encontrada.</div>;

  return (
    <div className="pagina-review-container">
      <div className="pagina-review">
        <div className="header-section" style={{ display: 'flex', gap: '20px' }}>
          <div
            className="logo-placeholder"
            style={{
              width: 120,
              height: 120,
              backgroundImage: `url(${plataforma.logo_url})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
          <div className="info-right">
            <h1>{plataforma.nome}</h1>
            <p>{plataforma.descricao || 'Sem descrição'}</p>
            <p>
              
              
              
            </p>
            <p>
              <strong>Fundado:</strong>{' '}
              {plataforma.data_fundacao
                ? new Date(plataforma.data_fundacao).toLocaleDateString('pt-BR')
                : 'Desconhecido'}
            </p>
            <p>
              <strong>Website:</strong>{' '}
              <a href={plataforma.website} target="_blank" rel="noreferrer">
                {plataforma.website}
              </a>
            </p>
          </div>
        </div>

        <hr style={{ margin: '20px 0' }} />

        <div className="avaliacao-section">
          <h2>Avalie esta plataforma</h2>

          <div className="rating-stars">
  {[5, 4, 3, 2, 1].map((num) => (
    <React.Fragment key={num}>
      <input
        type="radio"
        id={`star${num}`}
        name="rating"
        value={num}
        checked={rating === num}
        onChange={() => setRating(num)}
      />
      <label htmlFor={`star${num}`}>★</label>
    </React.Fragment>
  ))}
</div>




          <div style={{ marginTop: '10px' }}>
            <textarea className='search-input'
              placeholder="Comentário (opcional)..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              rows={3}
              style={{
                width: '100%',
                marginTop: '10px',
                fontSize: '16px',
                padding: '8px',
            }}

            />
          </div>

          <button
  onClick={enviarAvaliacao}
  style={{
    marginTop: '15px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    backgroundColor: '#646464',
    color: '#fff',          // texto branco para contraste
    borderRadius: '8px',    // bordas arredondadas
    border: 'none',         // remove borda padrão
  }}
>
  Enviar Avaliação
</button>

        </div>

        <hr style={{ margin: '30px 0' }} />

        <div className="avaliacoes-feitas">
          <h2>Avaliações</h2>
          {avaliacoes.length === 0 ? (
            <p>Não há avaliações ainda.</p>
          ) : (
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {avaliacoes.map((av) => (
                <li
                  key={av.id_avaliacao}
                  style={{
                    borderBottom: '1px solid #ddd',
                    padding: '10px 0',
                  }}
                >
                  <strong>{av.usuario_nome}</strong> — {renderStars(av.estrelas)}
                  <p style={{ margin: '5px 0 0' }}>{av.comentario || <em>Sem comentário</em>}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaginaReview;
