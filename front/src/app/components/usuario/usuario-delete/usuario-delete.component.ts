import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { UsuarioServices } from 'src/app/services/usuario.services';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  templateUrl: './usuario-delete.component.html',
  styleUrls: ['./usuario-delete.component.css']
})
export class UsuarioDeleteComponent implements OnInit {
  usuario!: UsuarioModel;
  errorMessage!: string;
  permissao: boolean = this.autenticacao.permissao;

  constructor(
    private usuarioServices: UsuarioServices,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private autenticacao: AutenticacaoService
  ) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] === undefined) {
        console.log('** Não Encontrou Parâmetro');
      } else {
        const id = params['id'];
        this.usuarioServices.findById(id)
          .subscribe(usuario => this.usuario = usuario);
      }
    });
  }

  usuarioDelete(id: string): void {
    console.log(" **********USUARIODELETE*********", id);
    this.usuarioServices.delete(id)
      .subscribe(() => {
        // Redireciona para a página de listagem de usuários
        this.router.navigate(['/UsuarioList']);
        // Redireciona a página atual para a lista de usuários
        this.location.replaceState('/UsuarioList');
      }, error => {
        // Em caso de erro, exibe a mensagem de erro retornada pelo backend
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Erro ao excluir usuário.';
        }
      });
  }

  goBack(): void {
    this.location.back();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    // Quando o usuário pressiona o botão "voltar", recarrega a página
    window.location.reload();
  }
}
