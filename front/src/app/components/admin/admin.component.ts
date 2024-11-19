import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config.service';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  mensagemAtualizacao: string = '';
  progressoAtualizacao: number = 0;
  botaoDesabilitado: boolean = false;
  permissao: boolean;
  token: string;
  headers: HttpHeaders;

  constructor(
    private router: Router,
    private autenticacao: AutenticacaoService,
    private http: HttpClient,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef
  ) {
    this.permissao = this.autenticacao.permissao;
    this.token = this.configService.Token;
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  ngOnInit(): void {
    if (this.permissao) {
      this.redirectToUsuarios(); // Redireciona automaticamente para a lista de usuários
    }
  }

  redirectToUsuarios(): void {
    this.router.navigate(['/UsuarioList']);
  }
}
