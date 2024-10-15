import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfService } from 'src/app/services/prof.services';
import { AutenticacaoService } from 'src/app/services/autenticacao.service'; // Importe o serviço de autenticação

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.css']
})
export class ProfComponent implements OnInit {
  permissao: boolean = false; // Inicialize com um valor padrão
  disciplinasUsuario: { sigla: string; nomeCompleto: string; cor: string;}[] = []; // Array de objetos

  constructor(
    private router: Router,
    private profService: ProfService,
    private autenticacao: AutenticacaoService
  ) {}

  ngOnInit(): void {
    this.permissao = this.autenticacao.permissao;
    this.disciplinasUsuario = this.autenticacao.getUserDisciplinas();
    console.log('Disciplinas do usuário:', this.disciplinasUsuario); // Log para depuração
  }

  selecionarProf(tipo: string): void {
    if (this.permissao) {
      console.log('Tipo de pergunta selecionado:', tipo);
      this.profService.setProf(tipo);
      this.router.navigate(['/PerguntaList'], { queryParams: { tipo: tipo } });
    } else {
      console.log('Usuário não tem permissão para acessar as perguntas.');
    }
  }
}
