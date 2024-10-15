import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config.service';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  mensagemAtualizacao: string = '';
  progressoAtualizacao: number = 0;
  botaoDesabilitado: boolean = false;
  permissao: boolean;
  zippingInProgress: boolean = false;
  token: string; // Mova a declaração do token para cá
  headers: HttpHeaders; // Mova a declaração dos headers para cá

  constructor(
    private router: Router,
    private autenticacao: AutenticacaoService,
    private http: HttpClient,
    private configService: ConfigService, // Adicione ConfigService aqui
    private cdr: ChangeDetectorRef
  ) {
    this.permissao = this.autenticacao.permissao;
    this.token = this.configService.Token; // Inicialize o token aqui
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`); // Inicialize os headers aqui
  }

  redirectToUsuarios(): void {
    this.router.navigate(['/UsuarioList']);
  }

  launchNewGameVersion(): void {
    this.zippingInProgress = true;
    this.botaoDesabilitado = true;
  
    this.http.post<any>('https://cyberchase-qa.onrender.com/api/arquivos/zip-jogo', { headers: this.headers }).subscribe(
    //this.http.post<any>('http://localhost:8080/api/arquivos/zip-jogo', { headers: this.headers }).subscribe(
      response => {
        this.mensagemAtualizacao = 'Nova versão do jogo lançada com sucesso!';
        this.progressoAtualizacao = 100;
      },
      error => {
        this.mensagemAtualizacao = 'Erro ao lançar nova versão do jogo. Por favor, tente novamente mais tarde.';
      },
      () => {
        this.zippingInProgress = false;
        this.botaoDesabilitado = false;
      }
    );
  }
}
