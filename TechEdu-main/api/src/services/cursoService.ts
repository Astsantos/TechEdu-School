import { interface_Curso } from '../../mock_data/curso_data';
import { Curso } from '../models/Curso';

const cursoRepository = interface_Curso.getRepository(Curso);

export const createCurso = async (data: {
  nome_curso: string;
  descricao_curso: string;
  carga_horaria: number;
  matriz_curricular: Buffer;
}): Promise<Curso> => {
  const curso = new Curso();
  curso.nome_curso = data.nome_curso;
  curso.descricao_curso = data.descricao_curso;
  curso.carga_horaria = data.carga_horaria;
  curso.matriz_curricular = data.matriz_curricular;

  return await cursoRepository.save(curso);
};

export const getCursoById = async (id: number): Promise<Curso | null> => {
  return await cursoRepository.findOneBy({ id });
};