import { Request, Response, NextFunction } from 'express';

export const validateCurso = (req: Request, res: Response, next: NextFunction) => {
  const { name, description, workload } = req.body;

  if (!name || name.length > 50) {
    return res.status(400).json({ error: 'Nome do curso é obrigatório e deve ter até 50 caracteres.' });
  }
  if (!description || description.length > 255) {
    return res.status(400).json({ error: 'Descrição do curso é obrigatório e deve ter até 255 caracteres.' });
  }
  if (!workload || isNaN(Number(workload))) {
    return res.status(400).json({ error: 'Carga horária deve ser um número e precisar ser o total de horas.' });
  }
  if (!req.file) {
    return res.status(400).json({ error: 'Arquivo da matriz curricular é obrigatório.' });
  }

  // Convert workload to integer
  req.body.workload = parseInt(workload, 10);
  next();
};