const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// CREATE: Adicionar uma nova plataforma
router.post('/', async (req, res) => {
  const { name, logoUrl, founded, website, description, category } = req.body;
  try {
    // Mapear o nome da categoria para o id_categoria
    const categoria = await pool.query('SELECT id_categoria FROM Categorias WHERE nome = $1', [category]);
    if (categoria.rows.length === 0) {
      return res.status(400).json({ message: 'Categoria não encontrada' });
    }
    const id_categoria = categoria.rows[0].id_categoria;

    const newPlataforma = await pool.query(
      'INSERT INTO Plataformas (nome, logo_url, data_fundacao, website, descricao, id_categoria) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, logoUrl, founded, website, description, id_categoria]
    );
    res.status(201).json(newPlataforma.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar plataforma' });
  }
});

// READ: Listar todas as plataformas
router.get('/', async (req, res) => {
  try {
    const plataformas = await pool.query(
      'SELECT p.*, c.nome AS categoria FROM Plataformas p LEFT JOIN Categorias c ON p.id_categoria = c.id_categoria'
    );
    res.json(plataformas.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar plataformas' });
  }
});

// READ: Obter uma plataforma específica por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const plataforma = await pool.query(
      'SELECT p.*, c.nome AS categoria FROM Plataformas p LEFT JOIN Categorias c ON p.id_categoria = c.id_categoria WHERE p.id_plataforma = $1',
      [id]
    );
    if (plataforma.rows.length === 0) {
      return res.status(404).json({ message: 'Plataforma não encontrada' });
    }
    res.json(plataforma.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar plataforma' });
  }
});

// UPDATE: Atualizar uma plataforma
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, logoUrl, founded, website, description, category } = req.body;
  try {
    const categoria = await pool.query('SELECT id_categoria FROM Categorias WHERE nome = $1', [category]);
    if (categoria.rows.length === 0) {
      return res.status(400).json({ message: 'Categoria não encontrada' });
    }
    const id_categoria = categoria.rows[0].id_categoria;

    const updatedPlataforma = await pool.query(
      'UPDATE Plataformas SET nome = $1, logo_url = $2, data_fundacao = $3, website = $4, descricao = $5, id_categoria = $6 WHERE id_plataforma = $7 RETURNING *',
      [name, logoUrl, founded, website, description, id_categoria, id]
    );
    if (updatedPlataforma.rows.length === 0) {
      return res.status(404).json({ message: 'Plataforma não encontrada' });
    }
    res.json(updatedPlataforma.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar plataforma' });
  }
});

// DELETE: Excluir uma plataforma
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPlataforma = await pool.query(
      'DELETE FROM Plataformas WHERE id_plataforma = $1 RETURNING *',
      [id]
    );
    if (deletedPlataforma.rows.length === 0) {
      return res.status(404).json({ message: 'Plataforma não encontrada' });
    }
    res.json({ message: 'Plataforma excluída com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir plataforma' });
  }
});

module.exports = router;