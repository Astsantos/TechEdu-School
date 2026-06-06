import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nome_curso: string;

  @Column({ length: 255 })
  descricao_curso: string;

  @Column({ type: 'int' })
  carga_horaria: number;

  @Column({ type: 'blob' })
  matriz_curricular: Buffer;  // binary data
}