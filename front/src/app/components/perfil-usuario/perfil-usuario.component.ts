import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { UsuarioModel } from 'src/app/models/usuario.model'; // Certifique-se de importar o modelo

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  permissao: boolean = false;
  isAdmin: boolean = false;
  disciplinasUsuario: { sigla: string; nomeCompleto: string; cor: string;}[] = []; // Array para armazenar as disciplinas do usuário

  constructor(
    private router: Router,
    private autenticacao: AutenticacaoService
  ) {}

  ngOnInit(): void {
    // Verifica a permissão do usuário
    this.permissao = this.autenticacao.permissao;

    // Recupera as disciplinas do usuário
    this.disciplinasUsuario = this.autenticacao.getUserDisciplinas();
    console.log('Disciplinas do usuário recuperadas:', this.disciplinasUsuario); // Log para depuração

    // Verifica se o usuário é administrador
    this.isAdmin = this.checkIsAdmin(this.disciplinasUsuario);
    console.log('É Admin:', this.isAdmin); // Log para depuração
  }

  // Verifica se o usuário possui a disciplina de admin
  checkIsAdmin(disciplinas: {sigla: string; nomeCompleto: string; cor: string;}[]): boolean {
    return disciplinas.some(disciplina => disciplina.sigla === 'admin');
  }

  // Seleciona o perfil e redireciona conforme a lógica
  selecionarPerfil(perfil: string): void {
    if (perfil === 'admin' && this.isAdmin) {
      this.router.navigate(['admin']);
    } else if (perfil === 'prof' && (!this.isAdmin || this.checkHasOtherDisciplines())) {
      this.router.navigate(['prof']);
    } else {
      console.error('Acesso negado ou perfil desconhecido:', perfil);
    }
  }

  // Verifica se o usuário tem outras disciplinas
  checkHasOtherDisciplines(): boolean {
    const disciplinas = this.autenticacao.getUserDisciplinas();
    return disciplinas.length > 1; // Se o usuário tiver mais de uma disciplina além de "admin"
  }
}
