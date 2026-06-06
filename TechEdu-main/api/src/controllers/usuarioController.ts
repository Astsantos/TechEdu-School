import { Request, Response } from 'express';
import * as usuarioService from '../services/usuarioService';

export const cadastrarUsuario = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;

    const novoUsuario = await usuarioService.cadastrarUsuario({
      nome,
      email,
      senha
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Falha em cadastrar usuário.' });
  }
};


export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const senha = req.body.senha;
    
    if (!email && !senha) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

  } catch (error) {
    res.status(500).json({ error: 'Falha em obter usuário.' });
  }
};