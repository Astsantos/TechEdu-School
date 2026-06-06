import { Request, Response } from 'express';
import * as cursoService from '../services/cursoService';

export const createCurso = async (req: Request, res: Response) => {
  try {
    const { nome_curso, descricao_curso, carga_horaria } = req.body;
    const matriz_curricular = req.file?.buffer;

    if (!matriz_curricular) {
      return res.status(400).json({ error: 'Arquivo para matriz curricular não anexado.' });
    }

    const newCurso = await cursoService.createCurso({
      nome_curso,
      descricao_curso,
      carga_horaria,
      matriz_curricular,
    });

    res.status(201).json(newCurso);
  } catch (error) {
    res.status(500).json({ error: 'Criação do curso falhou.' });
  }
};

export const getAllCursos = async (req: Request, res: Response) => {
  try {
    const cursos = await cursoService.getAllCursos();
    // Don't send binary data by default – convert to base64 or omit
    const cursosWithoutFile = cursos.map(({ matriz_curricular, ...rest }) => rest);
    res.json(cursosWithoutFile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cursos' });
  }
};

export const getCursoById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const curso = await cursoService.getCursoById(id);
    if (!curso) {
      return res.status(404).json({ error: 'Curso não encontrado.' });
    }
    // Send file as base64 if needed
    res.json({
      ...curso,
      file: curso.matriz_curricular.toString('base64'), // or send as Buffer with proper Content-Type
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch curso' });
  }
};

export const updateCurso = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const updateData: any = { ...req.body };
    if (req.file) {
      updateData.file = req.file.buffer;
    }
    const updated = await cursoService.updateCurso(id, updateData);
    if (!updated) {
      return res.status(404).json({ error: 'Curso not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update curso' });
  }
};

export const deleteCurso = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await cursoService.deleteCurso(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Curso not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete curso' });
  }
};