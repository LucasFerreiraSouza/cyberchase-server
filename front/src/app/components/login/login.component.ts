import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ConfigService } from '../../services/config.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(
    private router: Router,
    private autenticacao: AutenticacaoService,
    private configService: ConfigService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.autenticacao.permissao = false;
  }

  isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  fazLogin() {
    this.autenticacao.autenticar(this.email, this.senha).subscribe((autenticado) => {
      if (autenticado) {
        this.router.navigate(['perfil-usuario']);
      } else {
        alert('Email ou senha inválidos');
      }
    });
  }

  esqueciSenha() {
    this.router.navigate(['/esqueci-senha']);
  }

  baixarJogo() {
    const fileName = 'jogo.zip'; // O nome do arquivo que você quer baixar
    // Para download:
    window.location.href = `${this.configService.URL}/api/arquivos/download/${fileName}`;
  }
  
  jogarJogo() {
    //const jogoUrl = 'http://localhost:8080/jogo/index.html'; // URL para o seu jogo
    const jogoUrl = 'https://cyberchase-qa.onrender.com/jogo/index.html'; // URL para o seu jogo

    window.open(jogoUrl, '_blank'); // Abre em uma nova aba
  }
}
