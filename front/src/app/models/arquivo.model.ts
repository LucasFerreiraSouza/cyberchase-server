export class ArquivoModel {
  id?: any;
  nome?: string;
  base64?: string; // Atualize este campo para armazenar os dados em Base64
  createdAt?: any; // ou Date, dependendo do formato que você recebe do servidor
  
  pergunta?: string;
}
