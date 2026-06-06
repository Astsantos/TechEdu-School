import { interface_curso } from '../../mock_data/curso_data';
import { Curso } from '../models/Curso';

// Get the TypeORM repository for Curso
const cursoRepo = interface_curso.getRepository(Curso);

// Custom repository functions
export const findCursoById = async (id: number): Promise<Curso | null> => {
  return await cursoRepo.findOneBy({ id });
};

export const findAllCursos = async (): Promise<Curso[]> => {
  return await cursoRepo.find();
};

export const saveCurso = async (cursoData: Partial<Curso>): Promise<Curso> => {
  const curso = cursoRepo.create(cursoData);
  return await cursoRepo.save(curso);
};

// Example of a custom query with filtering
export const findCursosByWorkloadGreaterThan = async (minWorkload: number): Promise<Curso[]> => {
  return await cursoRepo
    .createQueryBuilder('curso')
    .where('curso.workload > :minWorkload', { minWorkload })
    .getMany();
};