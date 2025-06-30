const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const router = express.Router();

// Middleware para verificar token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

// REGISTRO
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await pool.query('SELECT * FROM Usuarios WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Email já registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      'INSERT INTO Usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id_usuario, nome, email',
      [name, email, hashedPassword]
    );

    const token = jwt.sign(
      { id: newUser.rows[0].id_usuario, email: newUser.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      token,
      user: {
        id_usuario: newUser.rows[0].id_usuario,
        nome: newUser.rows[0].nome,
        email: newUser.rows[0].email
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM Usuarios WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Email ou senha incorretos' });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].senha);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou senha incorretos' });
    }

    const token = jwt.sign(
      { id: user.rows[0].id_usuario, email: user.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id_usuario: user.rows[0].id_usuario,
        nome: user.rows[0].nome,
        email: user.rows[0].email
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// ATUALIZAR PERFIL
router.put('/profile', verifyToken, async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.user.id;

  try {
    if (email) {
      const emailExists = await pool.query(
        'SELECT * FROM Usuarios WHERE email = $1 AND id_usuario != $2',
        [email, userId]
      );
      if (emailExists.rows.length > 0) {
        return res.status(400).json({ message: 'Email já está em uso' });
      }
    }

    let query = 'UPDATE Usuarios SET ';
    let values = [];
    let index = 1;

    if (name) {
      query += `nome = $${index}, `;
      values.push(name);
      index++;
    }
    if (email) {
      query += `email = $${index}, `;
      values.push(email);
      index++;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      query += `senha = $${index}, `;
      values.push(hashedPassword);
      index++;
    }

    query = query.slice(0, -2) + ` WHERE id_usuario = $${index} RETURNING id_usuario, nome, email`;
    values.push(userId);

    const updatedUser = await pool.query(query, values);

    if (updatedUser.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const token = jwt.sign(
      { id: updatedUser.rows[0].id_usuario, email: updatedUser.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id_usuario: updatedUser.rows[0].id_usuario,
        nome: updatedUser.rows[0].nome,
        email: updatedUser.rows[0].email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// DELETAR CONTA
router.delete('/profile', verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const deletedUser = await pool.query(
      'DELETE FROM Usuarios WHERE id_usuario = $1 RETURNING id_usuario',
      [userId]
    );

    if (deletedUser.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({ message: 'Conta deletada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;
