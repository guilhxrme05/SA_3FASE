import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PaginaReview.css';

function PaginaReview() {
  const { id } = useParams(); // Pega o ID da URL (ex.: /review/1)
  const [plataforma, setPlataforma] = useState(null);

  useEffect(() => {
    fetchPlataforma();
  }, [id]);

  const fetchPlataforma = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/plataformas/${id}`);
      setPlataforma(response.data);
    } catch (error) {
      console.error('Erro ao carregar plataforma:', error);
    }
  };

  if (!plataforma) return <div>Carregando...</div>;

  return (
    <div className="pagina-review-container">
      <div className="pagina-review">
        <div className="header-section">
          <div
            className="logo-placeholder"
            style={{ backgroundImage: `url(${plataforma.logo_url})` }}
          ></div>
          <div className="info-right">
            <h1>{plataforma.nome}</h1>
            <p className="description">{plataforma.descricao || 'Sem descrição'}</p>
            <p className="rating">
              <strong>Rating</strong> {plataforma.rating || 0} {/* Placeholder, ajustar backend se necessário */}
            </p>
            <p className="reviews">
              <strong>Reviews</strong> {plataforma.reviews || 0} {/* Placeholder, ajustar backend se necessário */}
            </p>
          </div>
        </div>
        <div className="info-cards">
          <div className="info-card">
            <p>
              <strong>Fundado:</strong>{' '}
              {plataforma.data_fundacao
                ? new Date(plataforma.data_fundacao).toLocaleDateString('pt-BR')
                : '0000'}
            </p>
          </div>
          <div className="info-card">
            <p>
              <strong>Website:</strong>{' '}
              <a
                href={plataforma.website || 'https://www.example.com'}
                target="_blank"
                rel="noopener noreferrer"
              >
                {plataforma.website || 'www.example.com'}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaginaReview;