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
  errorMessage: string | null = null; // Inicialize como null
  permissao: boolean;

  constructor(
    private usuarioServices: UsuarioServices,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private autenticacao: AutenticacaoService
  ) {
    this.permissao = this.autenticacao.permissao;
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      const id = params['id'];
      if (id) {
        this.usuarioServices.findById(id).subscribe(usuario => {
          this.usuario = usuario;
        }, error => {
          this.errorMessage = 'Usuário não encontrado.';
        });
      } else {
        this.errorMessage = 'ID do usuário não especificado.';
      }
    });
  }

  usuarioDelete(id: string): void {
    this.usuarioServices.delete(id).subscribe(() => {
      this.router.navigate(['/UsuarioList']);
      this.location.replaceState('/UsuarioList');
    }, error => {
      this.errorMessage = error.error?.message || 'Erro ao excluir usuário.';
    });
  }

  goBack(): void {
    this.location.back();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    window.location.reload();
  }
}
