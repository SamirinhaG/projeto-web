require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const app = express();
app.use(express.json());

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });


// PARTE DE CADASTROS


app.post('/admin', async (req, res) => {
  try {
    const { nome, login, senha } = req.body;
    const novo = await prisma.admin.create({ data: { nome, login, senha } });
    return res.status(201).json(novo);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao cadastrar Admin: " + error.message });
  }
});

app.post('/alunos', async (req, res) => {
  try {
    const { nome, matricula, email, senha } = req.body;
    const aluno = await prisma.aluno.create({ data: { nome, matricula, email, senha } });
    return res.status(201).json(aluno);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao cadastrar Aluno: " + error.message });
  }
});

app.post('/pacientes', async (req, res) => {
  try {
    const { nome } = req.body;
    const paciente = await prisma.paciente.create({ data: { nome } });
    return res.status(201).json(paciente);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao cadastrar Paciente: " + error.message });
  }
});


// PARTE DE LOGINS


app.post('/login/admin', async (req, res) => {
  const { login, senha } = req.body;
  const admin = await prisma.admin.findUnique({ where: { login } });

  if (admin && admin.senha === senha) {
    return res.json({ message: "Login de Admin bem-sucedido!", id: admin.id });
  }
  return res.status(401).json({ error: "Credenciais de Admin inválidas." });
});

app.post('/login/aluno', async (req, res) => {
  const { matricula, senha } = req.body;
  const aluno = await prisma.aluno.findUnique({ where: { matricula } });

  if (aluno && aluno.senha === senha) {
    return res.json({ message: "Login de Aluno bem-sucedido!", id: aluno.id });
  }
  return res.status(401).json({ error: "Matrícula ou senha incorretos." });
});

// Acesso do Paciente: Como não usa senha, validamos pelo ID
app.post('/login/paciente', async (req, res) => {
  const { id } = req.body;
  const paciente = await prisma.paciente.findUnique({ where: { id: parseInt(id) } });

  if (paciente) {
    return res.json({ message: "Acesso ao prontuário liberado!", paciente });
  }
  return res.status(404).json({ error: "Paciente não encontrado." });
});

