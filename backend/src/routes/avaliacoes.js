const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// CREATE: Adicionar avaliação para uma plataforma
router.post('/', async (req, res) => {
  const { id_usuario, id_plataforma, estrelas, comentario } = req.body;

  try {
    // Verifica se o usuário já avaliou essa plataforma (opcional, evita duplicidade)
    const existing = await pool.query(
      'SELECT * FROM Avaliacoes WHERE id_usuario = $1 AND id_plataforma = $2',
      [id_usuario, id_plataforma]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Usuário já avaliou essa plataforma' });
    }

    const novaAvaliacao = await pool.query(
      'INSERT INTO Avaliacoes (id_usuario, id_plataforma, estrelas, comentario) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_usuario, id_plataforma, estrelas, comentario]
    );

    res.status(201).json(novaAvaliacao.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar avaliação' });
  }
});

// READ: Listar todas avaliações (pode filtrar por plataforma via query string ?plataforma=)
router.get('/', async (req, res) => {
  const { plataforma } = req.query;

  try {
    let query = `
      SELECT a.*, u.nome AS usuario_nome, p.nome AS plataforma_nome
      FROM Avaliacoes a
      JOIN Usuarios u ON a.id_usuario = u.id_usuario
      JOIN Plataformas p ON a.id_plataforma = p.id_plataforma
    `;
    let params = [];

    if (plataforma) {
      query += ' WHERE a.id_plataforma = $1';
      params.push(plataforma);
    }

    const avaliacoes = await pool.query(query, params);
    res.json(avaliacoes.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar avaliações' });
  }
});

// GET média de estrelas para uma plataforma (útil pra Home)
router.get('/media/:id_plataforma', async (req, res) => {
  const { id_plataforma } = req.params;

  try {
    const mediaResult = await pool.query(
      'SELECT AVG(estrelas)::numeric(10,2) AS media_estrelas, COUNT(*) AS total_avaliacoes FROM Avaliacoes WHERE id_plataforma = $1',
      [id_plataforma]
    );

    res.json({
      id_plataforma,
      media_estrelas: parseFloat(mediaResult.rows[0].media_estrelas) || 0,
      total_avaliacoes: parseInt(mediaResult.rows[0].total_avaliacoes, 10),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao calcular média' });
  }
});

// UPDATE: Atualizar avaliação (por id de avaliação)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { estrelas, comentario } = req.body;

  try {
    const updated = await pool.query(
      'UPDATE Avaliacoes SET estrelas = $1, comentario = $2 WHERE id_avaliacao = $3 RETURNING *',
      [estrelas, comentario, id]
    );

    if (updated.rows.length === 0) {
      return res.status(404).json({ message: 'Avaliação não encontrada' });
    }

    res.json(updated.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar avaliação' });
  }
});

// DELETE: Apagar avaliação (por id de avaliação)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await pool.query(
      'DELETE FROM Avaliacoes WHERE id_avaliacao = $1 RETURNING *',
      [id]
    );

    if (deleted.rows.length === 0) {
      return res.status(404).json({ message: 'Avaliação não encontrada' });
    }

    res.json({ message: 'Avaliação excluída com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir avaliação' });
  }
});

module.exports = router;
