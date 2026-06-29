const express = require('express');
const cors = require('cors');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Servir arquivos estáticos (HTML, CSS, JS) da pasta "arquivos front"
app.use(express.static(path.join(__dirname, 'arquivos front')));

// ── ROTAS DA API ──────────────────────────────────

// Cadastro de paciente
app.post('/api/pacientes', async (req, res) => {
    try {
        const { nome, telefone, email, necessidade } = req.body;
        if (!nome || !telefone) {
            return res.status(400).json({ error: 'Nome e telefone são obrigatórios.' });
        }
        const paciente = await prisma.paciente.create({
            data: { nome, telefone, email, necessidade }
        });
        res.status(201).json(paciente);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// Login do aluno
app.post('/api/login', async (req, res) => {
    try {
        const { matricula, senha } = req.body;
        const aluno = await prisma.aluno.findUnique({
            where: { matricula }
        });

        if (!aluno || aluno.senha !== senha) {
            return res.status(401).json({ error: 'Matrícula ou senha inválidos.' });
        }

        res.json({ success: true, id: aluno.id, nome: aluno.nome });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Cadastro de aluno
app.post('/api/alunos', async (req, res) => {
    try {
        const { nome, matricula, email, senha } = req.body;
        const aluno = await prisma.aluno.create({
            data: { nome, matricula, email, senha }
        });
        res.status(201).json(aluno);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// ── INICIAR SERVIDOR ──────────────────────────────
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});