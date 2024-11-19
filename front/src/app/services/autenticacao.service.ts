import { Injectable, NgZone } from '@angular/core';
import { UsuarioServices } from './usuario.services';
import { UsuarioModel } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private _permissao: boolean = false;
  private timer: any;
  usuarios?: UsuarioModel[];

  constructor(
    private usuarioServices: UsuarioServices,
    private router: Router,
    private ngZone: NgZone
  ) {
    const valorLocalStorage = localStorage.getItem('_permissao');
    console.log('Valor do localStorage _permissao:', valorLocalStorage);
    this.iniciarMonitoramento();
  }

  // Método para autenticar o usuário
  autenticar(email: string, senha: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      console.log('Tentativa de autenticação para o email:', email);
      this.usuarioServices.readAll().subscribe({
        next: (data) => {
          const usuarioAutenticado = data.find((item) => item.email === email && item.senha === senha);
          if (usuarioAutenticado) {
            localStorage.setItem('userId', usuarioAutenticado.id); // Armazenar o ID do usuário no localStorage
            localStorage.setItem('userDisciplinas', JSON.stringify(usuarioAutenticado.disciplinas ?? [])); // Armazenar as disciplinas do usuário

            // Armazenar os papéis do usuário
            localStorage.setItem('userRoles', JSON.stringify({
              isAdmin: usuarioAutenticado.isAdmin || false,
              isTeacher: usuarioAutenticado.isTeacher || false
            }));

            console.log('ID do usuário armazenado:', usuarioAutenticado.id);
            console.log('Disciplinas do usuário armazenadas:', usuarioAutenticado.disciplinas);

            this.permissao = true;
            this.resetarTimer(); // Resetar o timer após autenticação bem-sucedida
          } else {
            console.log('Usuário não encontrado para o email:', email);
          }
          observer.next(!!usuarioAutenticado);
          observer.complete();
        },
        error: (error) => {
          console.error('Erro ao autenticar:', error);
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  // Método para recuperar o ID do usuário
  getUserId(): string | null {
    const userId = localStorage.getItem('userId');
    console.log('ID do usuário recuperado:', userId);
    return userId;
  }

  getUserDisciplinas(): { sigla: string; nomeCompleto: string; cor: string; }[] {
    const userDisciplinas = localStorage.getItem('userDisciplinas');

    try {
      return userDisciplinas ? JSON.parse(userDisciplinas) : [];
    } catch (error) {
      console.error("Erro ao recuperar disciplinas do usuário:", error);
      return [];
    }
  }

  // Método para recuperar os papéis do usuário
  getUserRoles(): { isAdmin: boolean; isTeacher: boolean; } {
    const userRoles = localStorage.getItem('userRoles');

    try {
      return userRoles ? JSON.parse(userRoles) : { isAdmin: false, isTeacher: false };
    } catch (error) {
      console.error("Erro ao recuperar roles do usuário:", error);
      return { isAdmin: false, isTeacher: false };
    }
  }

  isAdmin(): boolean {
    return this.getUserRoles().isAdmin;
  }

  isTeacher(): boolean {
    return this.getUserRoles().isTeacher;
  }

  // Getter e setter para permissões
  public get permissao(): boolean {
    if (localStorage.getItem("permissao") === "false") {
      return false;
    } else {
      return true;
    }
  }

  public set permissao(value: boolean) {
    localStorage.setItem("permissao", JSON.stringify(value));
  }

  // Método para remover itens do localStorage
  removeItem(): void {
    localStorage.removeItem("permissao");
    localStorage.removeItem("userId");
    localStorage.removeItem("userDisciplinas");
    localStorage.removeItem("userRoles"); // Remover roles do usuário
  }

  // Lógica de monitoramento de inatividade
  iniciarMonitoramento() {
    this.resetarTimer();

    ['click', 'mousemove', 'keypress'].forEach(event => {
      window.addEventListener(event, () => this.resetarTimer());
    });
  }

  // Reseta o timer de inatividade
  resetarTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => this.redirecionarParaSemAcesso(), 600000); // 600000 ms = 600 s = 10 min
  }

  // Redireciona para a página de login após inatividade
  redirecionarParaSemAcesso() {
    this.ngZone.run(() => {
      this.removeItem();
      alert('Sua sessão expirou devido à inatividade. Por favor, faça login novamente.'); // Exibir mensagem diretamente
      this.router.navigate(['/login']).then(() => {
        window.location.reload(); // Força a recarga da página para garantir que o componente seja renderizado
      });
    });
  }
}
