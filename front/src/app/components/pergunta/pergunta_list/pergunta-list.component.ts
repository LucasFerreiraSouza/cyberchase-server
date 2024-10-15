import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerguntaModel } from 'src/app/models/pergunta.model';
import { PerguntaServices } from 'src/app/services/pergunta.services';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ArquivoModel } from 'src/app/models/arquivo.model';

@Component({
  selector: 'app-pergunta-list',
  templateUrl: './pergunta-list.component.html',
  styleUrls: ['./pergunta-list.component.css'],
})
export class PerguntaListComponent implements OnInit {
  perguntasEnsino?: PerguntaModel[];
  perguntasExercicio?: PerguntaModel[];
  permissao: boolean = false; // Inicialize como false
  disciplinasUsuario: { sigla: string; nomeCompleto: string; cor: string; }[] = []; // Ajuste para array de objetos
  arquivos: ArquivoModel[] = [];
  ProfsSelecionado: string = 'ensino';

  constructor(
    private perguntaServices: PerguntaServices,
    private router: Router,
    private autenticacao: AutenticacaoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtém a permissão e disciplinas do usuário
    this.permissao = this.autenticacao.permissao;
    this.disciplinasUsuario = this.autenticacao.getUserDisciplinas();

    // Lê os parâmetros da rota para saber qual tipo de pergunta carregar
    this.route.queryParams.subscribe(params => {
      this.ProfsSelecionado = params['tipo'] || 'ensino';
      this.carregarPerguntasPorDisciplinas(this.disciplinasUsuario, this.ProfsSelecionado);
    });
  }

  carregarPerguntasPorDisciplinas(disciplinas: { sigla: string; nomeCompleto: string; cor: string; }[], tipoPergunta: string): void {
    this.perguntaServices.readAll().subscribe({
      next: (data) => {
        console.log('Dados recebidos:', data); // Log dos dados recebidos
        if (tipoPergunta === 'ensino') {
          this.perguntasEnsino = data.filter(pergunta =>
            disciplinas.some(disciplina => disciplina.sigla === pergunta.disciplina?.sigla) &&
            pergunta.tipo === 'ensino'
          );
          console.log('Perguntas de Ensino:', this.perguntasEnsino); // Log das perguntas de ensino
        } else if (tipoPergunta === 'exercicio') {
          this.perguntasExercicio = data.filter(pergunta =>
            disciplinas.some(disciplina => disciplina.sigla === pergunta.disciplina?.sigla) &&
            pergunta.tipo === 'exercicio'
          );
          console.log('Perguntas de Exercício:', this.perguntasExercicio); // Log das perguntas de exercício
        }
        this.carregarArquivos();
      },
      error: (e) => console.error(e)
    });
  }

  carregarArquivos(): void {
    this.perguntaServices.readAllArquivos().subscribe({
      next: (arquivos) => {
        console.log('Arquivos recebidos:', arquivos);
        this.arquivos = arquivos;
      },
      error: (e) => console.error('Erro ao carregar arquivos:', e)
    });
  }

  obterBase64Imagem(perguntaId: string): string {
    const arquivo = this.arquivos.find(arq => arq.pergunta === perguntaId && arq.nome?.endsWith('.png'));
    return arquivo ? `${arquivo.base64}` : '';
  }

  obterBase64Audio(perguntaId: string): string {
    const arquivo = this.arquivos.find(arq => arq.pergunta === perguntaId && arq.nome?.endsWith('.ogg'));
    return arquivo ? `${arquivo.base64}` : '';
  }

  alterarPergunta(id: string) {
    this.router.navigate(['/PerguntaEdit', id]);
  }

  excluirPergunta(id: string) {
    this.router.navigate(['/PerguntaDelete', id]);
  }

  incluirPergunta() {
    this.router.navigate(['/PerguntaAdd']);
  }
}
