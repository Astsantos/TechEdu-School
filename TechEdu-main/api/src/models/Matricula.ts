import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Curso } from './Curso';
import { Usuario } from './Usuario';

@Entity()
export class Matricula {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  data: Date; // ou string 'YYYY-MM-DD' dependendo da necessidade

  @Column()
  cursoId: number; // chave estrangeira explícita

  @Column()
  usuarioId: number;

  @ManyToOne(() => Curso, (curso) => curso.matriculas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cursoId' })
  curso: Curso;

  @ManyToMany
}