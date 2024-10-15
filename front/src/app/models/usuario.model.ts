export class UsuarioModel {
  id?: any; // ID do usuário
  nome?: string; // Nome do usuário
  disciplinas?: { 
    sigla: string; 
    nomeCompleto: string; 
    cor?: string;  // Adicionando um campo de cor para cada disciplina
  }[]; // Array de disciplinas (objetos)
  email?: string; // Email do usuário
  senha?: string; // Senha do usuário
  perguntas?: string[]; // Array de perguntas (IDs ou strings)
}
