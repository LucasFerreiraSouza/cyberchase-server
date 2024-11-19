import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { UsuarioServices } from 'src/app/services/usuario.services';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  public newUsuario: UsuarioModel = {
    nome: '',
    disciplinas: [],
    email: '',
    senha: '',
    isAdmin: false,
    isTeacher: false
  };

  public disciplinas = [
    { sigla: 'IAC001', nomeCompleto: 'Arquitetura e Organização de Computadores', cor: '#32CD32', selecionada: false }, // Verde
    { sigla: 'IAL002', nomeCompleto: 'Algoritmos e Lógica de Programação', cor: '#32CD32', selecionada: false }, // Verde
    { sigla: 'ILM001', nomeCompleto: 'Programação em Microinformática', cor: '#32CD32', selecionada: false }, // Verde
    { sigla: 'ISI002', nomeCompleto: 'Sistemas de Informação', cor: '#32CD32', selecionada: false }, // Verde
    { sigla: 'MMD001', nomeCompleto: 'Matemática Discreta', cor: '#32CD32', selecionada: false }, // Verde
    { sigla: 'AAG001', nomeCompleto: 'Administração Geral', cor: '#FFD700', selecionada: false }, // Amarelo
    { sigla: 'ILP010', nomeCompleto: 'Linguagem de Programação', cor: '#FFD700', selecionada: false }, // Amarelo
    { sigla: 'ILP029', nomeCompleto: 'Linguagem de Programação II - Linguagem Visual Basic (VB)', cor: '#FFD700', selecionada: false }, // Amarelo
    { sigla: 'LPO001', nomeCompleto: 'Comunicação e Expressão', cor: '#FFD700', selecionada: false }, // Amarelo
    { sigla: 'MCA002', nomeCompleto: 'Cálculo', cor: '#FFD700', selecionada: false }, // Amarelo
    { sigla: 'CCG001', nomeCompleto: 'Contabilidade', cor: '#FF8C00', selecionada: false }, // Laranja
    { sigla: 'IED001', nomeCompleto: 'Estruturas de Dados', cor: '#FF8C00', selecionada: false }, // Laranja
    { sigla: 'IHC001', nomeCompleto: 'Interação Humano Computador', cor: '#FF8C00', selecionada: false }, // Laranja
    { sigla: 'IHW100', nomeCompleto: 'Laboratório de Hardware', cor: '#FF8C00', selecionada: false }, // Laranja
    { sigla: 'ISO100', nomeCompleto: 'Sistemas Operacionais I', cor: '#FF8C00', selecionada: false }, // Laranja
    { sigla: 'LIN100', nomeCompleto: 'Inglês I', cor: '#FF8C00', selecionada: false }, // Laranja
    { sigla: 'CEF100', nomeCompleto: 'Economia e Finanças', cor: '#FF0000', selecionada: false }, // Vermelho
    { sigla: 'IBD002', nomeCompleto: 'Banco de Dados', cor: '#FF0000', selecionada: false }, // Vermelho
    { sigla: 'IES100', nomeCompleto: 'Engenharia de Software I', cor: '#FF0000', selecionada: false }, // Vermelho
    { sigla: 'ILP007', nomeCompleto: 'Programação Orientada a Objetos', cor: '#FF0000', selecionada: false }, // Vermelho
    { sigla: 'ISO200', nomeCompleto: 'Sistemas Operacionais II', cor: '#FF0000', selecionada: false }, // Vermelho
    { sigla: 'LIN200', nomeCompleto: 'Inglês II', cor: '#FF0000', selecionada: false }, // Vermelho
    { sigla: 'HST002', nomeCompleto: 'Sociedade e Tecnologia', cor: '#8A2BE2', selecionada: false }, // Roxo
    { sigla: 'IBD100', nomeCompleto: 'Laboratório de Banco de Dados (Escolha 1)', cor: '#8A2BE2', selecionada: false }, // Roxo
    { sigla: 'IES200', nomeCompleto: 'Engenharia de Software II', cor: '#8A2BE2', selecionada: false }, // Roxo
    { sigla: 'ILP023', nomeCompleto: 'Programação para WEB', cor: '#8A2BE2', selecionada: false }, // Roxo
    { sigla: 'ISD001', nomeCompleto: 'Sistemas Distribuídos', cor: '#8A2BE2', selecionada: false }, // Roxo
    { sigla: 'LIN300', nomeCompleto: 'Inglês III', cor: '#8A2BE2', selecionada: false }, // Roxo
    { sigla: 'MET100', nomeCompleto: 'Estatística Aplicada', cor: '#8A2BE2', selecionada: false }, // Roxo
    { sigla: 'AGO005', nomeCompleto: 'Gestão de Projetos', cor: '#4B0082', selecionada: false }, // Anil/Índigo
    { sigla: 'IES300', nomeCompleto: 'Engenharia de Software III', cor: '#4B0082', selecionada: false }, // Anil/Índigo
    { sigla: 'IRC008', nomeCompleto: 'Redes de Computadores', cor: '#4B0082', selecionada: false }, // Anil/Índigo
    { sigla: 'ISG003', nomeCompleto: 'Segurança da Informação', cor: '#4B0082', selecionada: false }, // Anil/Índigo
    { sigla: 'LIN400', nomeCompleto: 'Inglês IV', cor: '#4B0082', selecionada: false }, // Anil/Índigo
    { sigla: 'MPL001', nomeCompleto: 'Programação Linear e Aplicações', cor: '#4B0082', selecionada: false }, // Anil/Índigo
    { sigla: 'AGR101', nomeCompleto: 'Gestão de Equipes', cor: '#00FFFF', selecionada: false }, // Ciano
    { sigla: 'CEE002', nomeCompleto: 'Empreendedorismo', cor: '#00FFFF', selecionada: false }, // Ciano
    { sigla: 'IES301', nomeCompleto: 'Laboratório de Engenharia de Software', cor: '#00FFFF', selecionada: false }, // Ciano
    { sigla: 'IRC100', nomeCompleto: 'Laboratório de Redes (Escolha 2)', cor: '#00FFFF', selecionada: false }, // Ciano
    { sigla: 'ITE002', nomeCompleto: 'Tópicos Especiais em Informática (Escolha 2)', cor: '#00FFFF', selecionada: false }, // Ciano
    { sigla: 'LIN500', nomeCompleto: 'Inglês V', cor: '#00FFFF', selecionada: false }, // Ciano
    { sigla: 'TTG001', nomeCompleto: 'Metodologia da Pesquisa Científico-Tecnológica', cor: '#00FFFF', selecionada: false }, // Ciano
    { sigla: 'TTG003', nomeCompleto: 'Trabalho de Graduação I', cor: '#00FFFF', selecionada: false }, // Ciano
    { sigla: 'HSO003', nomeCompleto: 'Ética e Responsabilidade Profissional', cor: '#EE82EE', selecionada: false }, // Violeta
    { sigla: 'IIA002', nomeCompleto: 'Inteligência Artificial (Escolha 3)', cor: '#EE82EE', selecionada: false }, // Violeta
    { sigla: 'ISA002', nomeCompleto: 'Auditoria de Sistemas (Escolha 3)', cor: '#EE82EE', selecionada: false }, // Violeta
    { sigla: 'ITI004', nomeCompleto: 'Gestão e Governança de Tecnologia da Informação', cor: '#EE82EE', selecionada: false }, // Violeta
    { sigla: 'LIN600', nomeCompleto: 'Inglês VI', cor: '#EE82EE', selecionada: false }, // Violeta
    { sigla: 'TES001', nomeCompleto: 'Estágio Supervisionado', cor: '#EE82EE', selecionada: false }, // Violeta
    { sigla: 'TTG103', nomeCompleto: 'Trabalho de Graduação II', cor: '#EE82EE', selecionada: false }  // Violeta  ];
  ]
  public mensagem: string | undefined;
  permissao: boolean = this.autenticacao.permissao || false; // Adicionando um valor padrão

  constructor(
      private usuarioServices: UsuarioServices,
      private location: Location,
      private autenticacao: AutenticacaoService
  ) { }

  ngOnInit(): void {
    console.log(this.permissao);
  }

  // Função para validar e-mail
  isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  createUsuario(): void {
    this.atualizarDisciplinas(); // Atualiza as disciplinas selecionadas antes de criar o usuário

    if (this.newUsuario.nome === '') {
        this.mensagem = 'Nome não informado';
        return;
    }
    if (this.newUsuario.senha === '') {
        this.mensagem = 'Senha não informada';
        return;
    }
    if (!this.newUsuario || !this.newUsuario.email || this.newUsuario.email === '' || !this.isValidEmail(this.newUsuario.email)) {
      this.mensagem = 'E-mail não informado ou inválido';
      return;
  }
  

    // Chama o serviço para criar um novo usuário
    this.usuarioServices.create(this.newUsuario).subscribe({
        next: () => {
            // Em caso de sucesso, retorna para a página anterior
            this.location.back();
        },
        error: (error) => {
            // Atribuição da mensagem de erro com tratamento para undefined
            if (error.error && error.error.message) {
                this.mensagem = error.error.message;
            } else {
                console.error(error);
                this.mensagem = "Ocorreu um erro ao criar o usuário. Por favor, tente novamente mais tarde.";
            }
        }
    });
}

atualizarDisciplinas(): void {
  // Verifica se newUsuario está definido, caso contrário inicializa
  if (!this.newUsuario) {
      this.newUsuario = { disciplinas: [] }; // Inicializa com um array vazio
  }

  // Garante que disciplinas é um array
  if (!this.newUsuario.disciplinas) {
      this.newUsuario.disciplinas = [];
  } else {
      // Limpa disciplinas existentes antes de adicionar novas
      this.newUsuario.disciplinas = [];
  }

  this.disciplinas.forEach(disciplina => {
      if (disciplina.selecionada) {
          // Aqui usamos o operador '!' para garantir que disciplinas não é undefined
          this.newUsuario.disciplinas!.push({
              sigla: disciplina.sigla,
              nomeCompleto: disciplina.nomeCompleto,
              cor: disciplina.cor
          });
      }
  });
}

}
