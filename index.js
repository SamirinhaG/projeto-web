require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const app = express();
app.use(express.json());

// Conexão com o Banco de Dados
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// CADASTRAR ADMIN
app.post('/admin', async (req, res) => {
  try {
    const { nome, login, senha } = req.body;
    const novo = await prisma.admin.create({ data: { nome, login, senha } });
    return res.status(201).json(novo);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao cadastrar Admin: " + error.message });
  }
});

// CADASTRAR ALUNO
app.post('/alunos', async (req, res) => {
  try {
    const { nome, matricula, email } = req.body;
    const aluno = await prisma.aluno.create({ data: { nome, matricula, email } });
    return res.status(201).json(aluno);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao cadastrar Aluno: " + error.message });
  }
});

// CADASTRAR PACIENTE
app.post('/pacientes', async (req, res) => {
  try {
    const { nome } = req.body;
    const paciente = await prisma.paciente.create({ data: { nome } });
    return res.status(201).json(paciente);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao cadastrar Paciente: " + error.message });
  }
});

