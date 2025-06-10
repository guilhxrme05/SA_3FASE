require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const plataformasRoutes = require('./routes/plataformas');
const pool = require('./config/db'); // Caminho correto para db.js


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/plataformas', plataformasRoutes);

// Teste de conexão com o banco (opcional, para depuração)
pool.connect((err, client, release) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err.stack);
  } else {
    console.log('Conexão com o banco estabelecida!');
    release();
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});