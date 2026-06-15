import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/conexao';

const JWT_SECRET = process.env.JWT_SECRET || 'seu_secret_super_seguro';

export const registrar = async (req: Request, res: Response): Promise<void> => {
    const { nome, sobrenome, data_nascimento, cep, endereco, telefone, cpf, email, senha, confirmacaoSenha } = req.body;

    if (!nome || !sobrenome || !data_nascimento || !cep || !endereco || !telefone || !cpf || !email || !senha || !confirmacaoSenha) {
        res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        return;
    }

    if (senha !== confirmacaoSenha) {
        res.status(400).json({ error: 'A senha e a confirmação de senha não coincidem.' });
        return;
    }

    // Validação de maioridade (18 anos)
    const hoje = new Date();
    const nascimento = new Date(data_nascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    if (idade < 18) {
        res.status(400).json({ error: 'Apenas pessoas maiores de 18 anos podem se cadastrar.' });
        return;
    }

    try {
        const [rows]: any = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            res.status(400).json({ error: 'Este e-mail já está em uso.' });
            return;
        }

        const saltRounds = 10;
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

        await pool.query(
            `INSERT INTO users (nome, sobrenome, data_nascimento, cep, endereco, telefone, cpf, email, senha) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [nome, sobrenome, data_nascimento, cep, endereco, telefone, cpf, email, senhaCriptografada]
        );

        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno ao realizar cadastro.' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, senha } = req.body;
    const erroSeguranca = 'E-mail ou senha incorretos.';

    if (!email || !senha) {
        res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
        return;
    }

    try {
        const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            res.status(401).json({ error: erroSeguranca });
            return;
        }

        const user = rows[0];
        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) {
            res.status(401).json({ error: erroSeguranca });
            return;
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });

        res.json({
            message: 'Login realizado com sucesso!',
            token,
            user: { id: user.id, nome: user.nome, email: user.email }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno ao realizar login.' });
    }
};