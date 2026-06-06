//import { AppDataSource } from '../data-source'; // your TypeORM data source
import { usuarioRepository } from '../repositories/usuarioRepository';

//const cursoRepository = AppDataSource.getRepository(Curso);

export const cadastrarUsuario = async (data: {
  nome: string;
  email: string;
  senha: string;
}): Promise<Usuario> => {
  const usuario = new Usuario();
  usuario.nome = data.nome;
  usuario.email = data.email;
  usuario.senha = data.senha;

  return await usuarioRepository.save(Usuario);
};

export const getCursoById = async (id: number): Promise<Usuario | null> => {
  return await usuarioRepository.findOneBy({ id });
};