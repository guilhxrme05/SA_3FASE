# SA_3FASE

## 🧠 Avalia+

**Uma plataforma web para comparar e avaliar diversas plataformas**, como serviços de streaming, educação online e ferramentas digitais, ajudando os usuários a escolher a melhor opção.

---

## 👥 Integrantes do Projeto

- [Guilherme Cabral](https://github.com/guilhxrme05)
- [Pedro Henrique](https://github.com/phenrique180)
- [Thomaz B.](https://github.com/T0MMY-z)
- [Felipe](https://github.com/felipewnoob)

---

## ✅ Requisitos Funcionais

### 🔐 Guilherme: Gestão de Usuários e Autenticação
- **RF 001**: Cadastro, login, edição de informações e exclusão de conta.
- **RF 002**: Restringir avaliações apenas a usuários logados.

### 🛠️ Felipe: Cadastro e Gerenciamento de Serviços
- **RF 003**: Cadastro de serviços com nome, categoria, preço e descrição.
- **RF 004**: Edição e exclusão de serviços cadastrados.

### ⭐ Pedro H.: Sistema de Avaliação
- **RF 005**: Avaliação dos serviços com notas de 1 a 5 estrelas e um comentário opcional.
- **RF 006**: Adição de comentários às avaliações.
- **RF 007**: Visualização, edição e remoção de avaliações anteriores pelo usuário.

### 🔎 Thomaz: Filtros, Pesquisa e Exibição
- **RF 008**: Filtro de serviços por categoria.
- **RF 009**: Ordenação de serviços por preço (crescente e decrescente).
- **RF 010**: Pesquisa por nome do serviço.
- **RF 011**: Exibição da média das estrelas e comentários nas avaliações.
- **RF 012**: Listagem de avaliações da mais recente para a mais antiga.

---

## 🖼️ Protótipos de Tela

- **Tela de Login**  
  ![Tela de login](https://github.com/user-attachments/assets/7d5e7ee8-8c40-48e7-9968-821e7aa88046)

- **Tela de Registro**  
  ![Tela de registro](https://github.com/user-attachments/assets/b1557c1d-c6cb-4be0-b562-bc3ba2038877)

- **Tela de Gerenciamento de Serviços**  
  ![Gerenciamento de serviços](https://github.com/user-attachments/assets/ed931499-c8cd-4ec8-8582-b8e34d10a041)

- **Tela de Exibição de Serviço**  
  ![Página inicial](https://github.com/user-attachments/assets/5b7a6523-ccd4-4991-b824-1631b893524b)

- **Landing Page**  
  ![Landing page](https://github.com/user-attachments/assets/df8e38ff-2966-4655-93ae-55bd4bf01b88)

- **Tela de Exibição e Avaliação**  
  ![Avaliação](https://github.com/user-attachments/assets/2c24bcf0-4127-4c00-b032-215479210263)

- **Tela de Página de Perfil**  
  ![Perfil](https://github.com/user-attachments/assets/20f1d882-ae54-4b12-b9c0-c7760b524d0f)

---

## 🗄️ Banco de Dados

A estrutura abaixo representa o banco de dados utilizado na plataforma **Avalia+**, utilizando PostgreSQL.

```sql
-- Tabela de Usuários
CREATE TABLE Usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- Tabela de Categorias de Plataforma
CREATE TABLE Categorias (
    id_categoria SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

-- Tabela de Plataformas
CREATE TABLE Plataformas (
    id_plataforma SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    website VARCHAR(255),
    data_fundacao DATE,
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria)
);

-- Tabela de Avaliações
CREATE TABLE Avaliacoes (
    id_avaliacao SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_plataforma INT NOT NULL,
    nota NUMERIC(3,1) NOT NULL CHECK (nota >= 0 AND nota <= 5),
    comentario TEXT,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_plataforma) REFERENCES Plataformas(id_plataforma) ON DELETE CASCADE
);
