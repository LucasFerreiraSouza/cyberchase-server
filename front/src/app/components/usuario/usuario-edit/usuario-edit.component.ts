import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { UsuarioServices } from 'src/app/services/usuario.services';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario!: UsuarioModel;
  public disciplinas = [
    { sigla: 'admin', nomeCompleto: 'admin', cor: '#1E90FF', selecionada: false }, // Azul
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
    { sigla: 'TTG103', nomeCompleto: 'Trabalho de Graduação II', cor: '#EE82EE', selecionada: false }  // Violeta
];

  permissao: boolean = this.autenticacao.permissao;
  message!: string;

  constructor(
    private usuarioServices: UsuarioServices,
    private route: ActivatedRoute,
    private location: Location,
    private autenticacao: AutenticacaoService
  ) { }

  ngOnInit(): void {
    // Inicializa o usuário com valores padrão
    this.usuario = {
      id: '',
      nome: '',
      email: '',
      senha: '',
      disciplinas: [] // Inicializa como um array vazio
    };

    this.route.params.forEach((params: Params) => {
      if (params['id'] === undefined) {
        console.log('** Não Encontrou Parâmetro');
      } else {
        const id = params['id'];
        this.usuarioServices.findById(id)
          .subscribe(usuario => {
            this.usuario = usuario;
            this.atualizarDisciplinasSelecionadas(); // Atualiza a seleção de disciplinas
          });
      }
    });
  }

  // Função para validar e-mail
  isValidEmail(email: string | undefined): boolean {
    if (!email) {
      return false;
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Atualiza as disciplinas selecionadas com base nos dados do usuário
  atualizarDisciplinasSelecionadas(): void {
    const disciplinasUsuario = this.usuario.disciplinas || []; // Garante que seja um array

    this.disciplinas.forEach(disciplina => {
      disciplina.selecionada = disciplinasUsuario.some(d => d.sigla === disciplina.sigla);
    });
  }

  usuarioEdit(): void {
    this.message = '';

    // Verifica se o e-mail é válido
    if (!this.isValidEmail(this.usuario.email)) {
      this.message = 'E-mail não informado ou inválido';
      return;
    }

    // Atualiza as disciplinas selecionadas antes de enviar
    this.usuario.disciplinas = this.disciplinas.filter(d => d.selecionada);

    this.usuarioServices.update(this.usuario.id, this.usuario)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'Usuário atualizado com sucesso!';
          this.location.back();
        },
        error: (e) => {
          console.error(e);
          this.message = 'Erro ao atualizar o usuário!';
        }
      });
  }
}
