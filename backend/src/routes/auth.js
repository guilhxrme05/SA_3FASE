const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificar se o email já existe
    const userExists = await pool.query('SELECT * FROM Usuarios WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Email já registrado' });
    }

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Inserir novo usuário
    const newUser = await pool.query(
      'INSERT INTO Usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id_usuario, nome, email',
      [name, email, hashedPassword]
    );

    // Gerar token JWT
    const token = jwt.sign(
      { id: newUser.rows[0].id_usuario, email: newUser.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      token,
      user: { id: newUser.rows[0].id_usuario, name: newUser.rows[0].nome, email: newUser.rows[0].email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe
    const user = await pool.query('SELECT * FROM Usuarios WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Email ou senha incorretos' });
    }

    // Verificar a senha
    const isMatch = await bcrypt.compare(password, user.rows[0].senha);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou senha incorretos' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.rows[0].id_usuario, email: user.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: { id: user.rows[0].id_usuario, name: user.rows[0].nome, email: user.rows[0].email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;