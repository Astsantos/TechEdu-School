import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Curso } from './Curso';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nome: string;

  @Column({ length: 255 })
  email: string;

  @Column()
  senha: string;

  @ManyToMany(() => Curso, (curso) => curso.usuarios)
  @JoinTable({
    name: 'Matricula',               // junction table name
    joinColumn: { name: 'usuario_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'curso_id', referencedColumnName: 'id' }
  })
  cursos: Curso[];
}
