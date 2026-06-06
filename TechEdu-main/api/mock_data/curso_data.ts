export interface interface_curso {
  id: number;
  name: string;        // max 50 chars
  description: string; // max 255 chars
  workload: number;
  file: ArrayBuffer | Uint8Array | Buffer; // binary
}

const novoCurso = new Curso();
novoCurso.name = 'Introdução ao TypeScript';
novoCurso.description = 'Aprenda os fundamentos do TypeScript';
novoCurso.workload = 40;
novoCurso.file = Buffer.from('conteúdo do arquivo...', 'utf-8');

await dataSource.manager.save(novoCurso);