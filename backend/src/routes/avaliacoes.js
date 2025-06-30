const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// CREATE: Adicionar avaliação para uma plataforma
router.post('/', async (req, res) => {
  const { id_usuario, id_plataforma, estrelas, comentario } = req.body;
  console.log('Dados recebidos:', { id_usuario, id_plataforma, estrelas, comentario });

  try {
    // Validações
    if (!id_usuario || !id_plataforma || (estrelas === undefined || estrelas === null)) {
      return res.status(400).json({ message: 'id_usuario, id_plataforma e estrelas são obrigatórios' });
    }
    if (estrelas < 0 || estrelas > 5) {
      return res.status(400).json({ message: 'Estrelas deve estar entre 0 e 5' });
    }

    // Verifica se o usuário já avaliou essa plataforma
    const existing = await pool.query(
      'SELECT * FROM Avaliacoes WHERE id_usuario = $1 AND id_plataforma = $2',
      [id_usuario, id_plataforma]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Usuário já avaliou essa plataforma' });
    }

    // Verifica se id_usuario e id_plataforma existem
    const userCheck = await pool.query('SELECT 1 FROM Usuarios WHERE id_usuario = $1', [id_usuario]);
    if (userCheck.rows.length === 0) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }
    const platformCheck = await pool.query('SELECT 1 FROM Plataformas WHERE id_plataforma = $1', [id_plataforma]);
    if (platformCheck.rows.length === 0) {
      return res.status(400).json({ message: 'Plataforma não encontrada' });
    }

    const novaAvaliacao = await pool.query(
      'INSERT INTO Avaliacoes (id_usuario, id_plataforma, estrelas, comentario) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_usuario, id_plataforma, estrelas, comentario]
    );

    res.status(201).json(novaAvaliacao.rows[0]);
  } catch (error) {
    console.error('Erro ao criar avaliação:', error.stack);
    res.status(500).json({ message: 'Erro ao criar avaliação', error: error.message });
  }
});

// READ: Listar avaliações, pode filtrar por plataforma e/ou usuário via query string
router.get('/', async (req, res) => {
  const { plataforma, usuario } = req.query;

  try {
    let query = `
      SELECT a.*, u.nome AS usuario_nome, p.nome AS plataforma_nome
      FROM Avaliacoes a
      JOIN Usuarios u ON a.id_usuario = u.id_usuario
      JOIN Plataformas p ON a.id_plataforma = p.id_plataforma
    `;

    const conditions = [];
    const params = [];

    if (plataforma) {
      params.push(plataforma);
      conditions.push(`a.id_plataforma = $${params.length}`);
    }

    if (usuario) {
      params.push(usuario);
      conditions.push(`a.id_usuario = $${params.length}`);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    const avaliacoes = await pool.query(query, params);
    res.json(avaliacoes.rows);
  } catch (error) {
    console.error('Erro ao listar avaliações:', error.stack);
    res.status(500).json({ message: 'Erro ao listar avaliações', error: error.message });
  }
});

// GET média de estrelas para uma plataforma
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
    console.error('Erro ao calcular média:', error.stack);
    res.status(500).json({ message: 'Erro ao calcular média', error: error.message });
  }
});

// UPDATE: Atualizar avaliação
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { estrelas, comentario } = req.body;

  try {
    if (estrelas === undefined && comentario === undefined) {
      return res.status(400).json({ message: 'Pelo menos uma alteração (estrelas ou comentário) é obrigatória' });
    }
    if (estrelas !== undefined && (estrelas < 0 || estrelas > 5)) {
      return res.status(400).json({ message: 'Estrelas deve estar entre 0 e 5' });
    }

    const updated = await pool.query(
      'UPDATE Avaliacoes SET estrelas = COALESCE($1, estrelas), comentario = COALESCE($2, comentario) WHERE id_avaliacao = $3 RETURNING *',
      [estrelas, comentario, id]
    );

    if (updated.rows.length === 0) {
      return res.status(404).json({ message: 'Avaliação não encontrada' });
    }

    res.json(updated.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar avaliação:', error.stack);
    res.status(500).json({ message: 'Erro ao atualizar avaliação', error: error.message });
  }
});

// DELETE: Apagar avaliação
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
    console.error('Erro ao excluir avaliação:', error.stack);
    res.status(500).json({ message: 'Erro ao excluir avaliação', error: error.message });
  }
});



module.exports = router;
