import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  permissao: boolean = false;
  isAdmin: boolean = false;
  isTeacher: boolean = false;
  disciplinasUsuario: { sigla: string; nomeCompleto: string; cor: string; }[] = [];

  constructor(
    private router: Router,
    private autenticacao: AutenticacaoService
  ) {}

  ngOnInit(): void {
    this.permissao = this.autenticacao.permissao; // Verifica a permissão
    this.disciplinasUsuario = this.autenticacao.getUserDisciplinas(); // Recupera disciplinas
    this.isAdmin = this.autenticacao.isAdmin(); // Verifica se é admin
    this.isTeacher = this.autenticacao.isTeacher(); // Verifica se é professor
    
  }

  // Seleciona o perfil e redireciona conforme a lógica
  selecionarPerfil(perfil: string): void {
    if (perfil === 'admin' && this.isAdmin) {
      this.router.navigate(['admin']);
    } else if (perfil === 'prof' && (this.isTeacher || this.checkHasOtherDisciplines())) {
      this.router.navigate(['prof']);
    } else {
      console.error('Acesso negado ou perfil desconhecido:', perfil);
    }
  }

  // Verifica se o usuário tem outras disciplinas
  checkHasOtherDisciplines(): boolean {
    const disciplinas = this.autenticacao.getUserDisciplinas();
    return disciplinas.length > 1; // Se o usuário tiver mais de uma disciplina
  }
}
