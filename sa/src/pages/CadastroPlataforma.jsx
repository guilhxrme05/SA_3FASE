import { useState, useEffect } from 'react';
import './CadastroPlataforma.css';
import axios from 'axios';

function CadastroPlataforma() {
  const [formData, setFormData] = useState({
    name: '',
    logoUrl: '',
    founded: '',
    website: '',
    description: '',
    category: '',
    rating: 0, // nota da plataforma
  });
  const [plataformas, setPlataformas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPlataformas();
  }, []);

  const fetchPlataformas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/plataformas');
      setPlataformas(response.data);
    } catch (error) {
      alert('Erro ao carregar plataformas');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      rating: Number(e.target.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/plataformas', formData);
      setPlataformas([...plataformas, response.data]);
      setFormData({
        name: '',
        logoUrl: '',
        founded: '',
        website: '',
        description: '',
        category: '',
        rating: 0,
      });
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao salvar plataforma');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPlataformas = plataformas.filter((plataforma) =>
    plataforma.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cadastro-plataforma">
      <header>
        <h1>Gerenciamento de Plataformas</h1>
        <nav>
          <a href="/login">Login</a>
          <a href="/registro">Registro</a>
        </nav>
      </header>
      <div className="content-wrapper">
        <div className="platform-form">
          <h3>Nova plataforma</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome da plataforma</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nome da plataforma"
                required
              />
              <label>Logo URL</label>
              <input
                type="text"
                name="logoUrl"
                value={formData.logoUrl}
                onChange={handleChange}
                placeholder="Logo URL"
              />
            </div>
            <div className="form-group">
              <label>Data de fundação</label>
              <input
                type="date"
                name="founded"
                value={formData.founded}
                onChange={handleChange}
                placeholder="Data de fundação"
              />
              <label>Website</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Website"
              />
            </div>


            <label>Nota</label>
            <div className="rating">
              <input
                type="radio"
                id="star1"
                name="rating"
                value="1"
                checked={formData.rating === 1}
                onChange={handleRatingChange}
              />
              <label htmlFor="star1"></label>

              <input
                type="radio"
                id="star2"
                name="rating"
                value="2"
                checked={formData.rating === 2}
                onChange={handleRatingChange}
              />
              <label htmlFor="star2"></label>

              <input
                type="radio"
                id="star3"
                name="rating"
                value="3"
                checked={formData.rating === 3}
                onChange={handleRatingChange}
              />
              <label htmlFor="star3"></label>

              <input
                type="radio"
                id="star4"
                name="rating"
                value="4"
                checked={formData.rating === 4}
                onChange={handleRatingChange}
              />
              <label htmlFor="star4"></label>

              <input
                type="radio"
                id="star5"
                name="rating"
                value="5"
                checked={formData.rating === 5}
                onChange={handleRatingChange}
              />
              <label htmlFor="star5"></label>
            </div>



            <div className="form-group">
              <label>Descrição</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descrição"
                rows="4"
              />
            </div>
            <div className="form-group">
              <label>Categoria</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Selecione uma categoria</option>
                <option value="Streaming">Streaming</option>
                <option value="Jogos">Jogos</option>
                <option value="Educação">Educação</option>
                <option value="Música">Música</option>
                <option value="Social">Social</option>
                <option value="Financeiro">Financeiro</option>
              </select>
            </div>
            <button type="submit" className="submit-button">
              + Adicionar plataforma
            </button>
          </form>
        </div>

        <div className="plataformas-list">
          <h2>Plataformas existentes</h2>
          <input
            type="text"
            className="search-bar"
            placeholder="Busque plataformas"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <ul>
            {filteredPlataformas.length === 0 ? (
              <p>Nenhuma plataforma cadastrada.</p>
            ) : (
              filteredPlataformas.map((plataforma) => (
                <li key={plataforma.id_plataforma}>
                  <div
                    className="platform-logo"
                    style={{ backgroundImage: `url(${plataforma.logo_url})` }}
                  ></div>
                  <div className="platform-name">{plataforma.nome}</div>
                  <div className="platform-category">{plataforma.categoria}</div>
                  <div className="platform-description">{plataforma.descricao}</div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CadastroPlataforma;