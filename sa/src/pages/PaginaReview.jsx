import './PaginaReview.css';

function PaginaReview() {
  return (
    <div className="pagina-review-container">
      <div className="pagina-review">
        <div className="header-section">
          <div className="logo-placeholder"></div>
          <div className="info-right">
            <h1>Netflix</h1>
            <p className="description">Descrição plataforma</p>
            <p className="rating">
              <strong>Rating</strong> 0
            </p>
            <p className='reviews'>
            <strong>Reviews</strong> 0
            </p>
          </div>
        </div>
        <div className="info-cards">
          <div className="info-card">
            <p>
              <strong>Fundado:</strong> 0000
            </p>
          </div>
          <div className="info-card">
            <p>
              <strong>Website:</strong>{' '}
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                www.example.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaginaReview;