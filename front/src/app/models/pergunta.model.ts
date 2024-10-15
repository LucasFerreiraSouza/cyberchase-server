import { ArquivoModel } from './arquivo.model';

export class PerguntaModel {
  id?: any;
  disciplina?: {
    sigla: string;
    nomeCompleto: string;
    cor?: string;  // Adicionando um campo de cor para a disciplina, se necessário
  };
  tipo?: string;
  GUID?: string;
  E?: number;
  Q_T?: number;
  Q?: string;
  T?: number;
  I?: number;
  A?: number;
  C_A?: string;
  A2?: string;
  descricao?: string;
  A3?: string;
  A3_Why?: string;
  A4?: string;
  A4_Why?: string;
  A5?: string;
  A5_Why?: string;
  C_S?: number;
  S?: string;
  R_T?: string;
  R_I?: number;
  R_A?: number;
  P_T?: string;
  P_I?: number;
  P_A?: number;
  O_L?: number;

  usuario?: string;
  arquivos?: ArquivoModel[];
}
