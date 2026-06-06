import { interface_curso } from '../../mock_data/curso_data';
import { Usuario } from '../models/Usuario';

// Get the TypeORM repository for Curso
const usuarioRepository = interface_curso.getRepository(Usuario);

// Custom repository functions
export const findUsuarioById = async (id: number): Promise<Curso | null> => {
  return await usuarioRepository.findOneBy({ id });
};