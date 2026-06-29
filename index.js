require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Necessário para conectar o Front ao Back
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const app = express();
app.use(express.json());
app.use(cors()); // Libera a comunicação com as suas telas HTML

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// CADASTRAR PACIENTE
app.post('/pacientes', async (req, res) => {
  try {
    const { nome, telefone, email, necessidade } = req.body;
    const paciente = await prisma.paciente.create({ 
      data: { nome, telefone, email, necessidade } 
    });
    return res.status(201).json(paciente);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao cadastrar Paciente: " + error.message });
  }
});

// LOGIN ALUNO 
app.post('/login/aluno', async (req, res) => {
  try {
    const { matricula, senha } = req.body;
    const aluno = await prisma.aluno.findUnique({ where: { matricula } });

    if (aluno && aluno.senha === senha) {
      return res.json({ message: "Login realizado!", id: aluno.id });
    }
    return res.status(401).json({ error: "Matrícula ou senha incorretos." });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno." });
  }
});

// CADASTRO DO ALUNO
app.post('/alunos', async (req, res) => {
  try {
    const { nome, matricula, email, senha } = req.body;
    const aluno = await prisma.aluno.create({ data: { nome, matricula, email, senha } });
    return res.status(201).json(aluno);
  } catch (error) {
    return res.status(400).json({ error: "Erro: " + error.message });
  }
});
