import { useState } from 'react';
import './CadastroPlataforma.css';

function CadastroPlataforma() {
  const [formData, setFormData] = useState({
    name: '',
    logoUrl: '',
    founded: '',
    website: '',
    description: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nova plataforma:', formData);

  };


  return (
    <div className="cadastro-plataforma">


      <div className="content-wrapper">
        <h2>Gerenciamento de plataformas</h2>
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
                type="text"
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
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="">Selecione uma categoria</option>
                <option value="Filmes">Streaming</option>
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

        <h2>Plataformas existentes</h2>
      </div>
    </div>
  );
}

export default CadastroPlataforma;