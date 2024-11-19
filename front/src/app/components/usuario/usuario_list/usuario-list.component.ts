import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioServices } from 'src/app/services/usuario.services';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-usuario_list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css'],
})
export class UsuarioListComponent {
  usuarios: UsuarioModel[] = [];
  permissao: boolean = this.autenticacao.permissao;
  mensagemAtualizacao: boolean = false; 

  constructor(
      private usuarioServices: UsuarioServices,
      private router: Router,
      private autenticacao: AutenticacaoService
    ) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.usuarioServices.readAll().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (error) => {
        if (error.error && error.error.message) {
          // Aqui, considere usar um sistema de notificação em vez de alert
          console.error(error.error.message);
        } else {
          console.error(error);
          // Novamente, uma notificação pode ser melhor aqui
          console.error("Ocorreu um erro ao carregar os usuários.");
        }
      }
    });
  }

  alterarUsuario(id: string): void {
    this.router.navigate(['/UsuarioEdit', id]);
  }

  excluirUsuario(id: string): void {
    this.router.navigate(['/UsuarioDelete', id]);
  }

  incluirUsuario(): void {
    this.router.navigate(['/UsuarioAdd']);
  }
}
