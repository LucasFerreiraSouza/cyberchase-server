import { Component } from '@angular/core';
import { RecuperarSenhaService } from '../../services/recuperar-senha.service';
import { UsuarioServices } from 'src/app/services/usuario.services';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css']
})
export class EsqueciSenhaComponent {
  email: any | String;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    // private recuperarSenhaService: RecuperarSenhaService,
    private usuarioServices: UsuarioServices
  ) {}

  // onSubmitEmail() {
  //   console.log('Iniciando processo de recuperação de senha para o email:', this.email);
  //   this.recuperarSenhaService.enviarEmailRecuperacao(this.email).subscribe(
  //     response => {
  //       // Verifica se a resposta contém a mensagem de sucesso esperada
  //       this.successMessage = response.message;
  //       this.errorMessage = ''; // Limpa a mensagem de erro
  //       console.log('E-mail de recuperação enviado', response);
  //     },
  //     error => {
  //       // Aqui você pode tratar os erros recebidos do back-end
  //       // Certifique-se de que está interpretando corretamente a estrutura do erro
  //       if (error.status === 500 && error.error.message === "Usuário com o e-mail especificado não encontrado.") {
  //         this.errorMessage = 'Erro ao enviar e-mail de recuperação. Por favor, tente novamente.';
  //       } else {
  //         this.errorMessage = 'Usuário com o e-mail especificado não encontrado.';
  //       }
  //       this.successMessage = ''; // Limpa a mensagem de sucesso
  //       console.error('Erro ao enviar e-mail de recuperação', error);
  //     }
  //   );
  // }

  async sendEmail(){

    const user = await this.usuarioServices.checkUser(this.email)

    if(user){
      this.usuarioServices.requestResetPassword(user.email)
    }else{
      console.log("Usuario não existe");
    }

  }

}
