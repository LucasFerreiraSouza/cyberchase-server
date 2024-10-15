import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PerguntaServices } from 'src/app/services/pergunta.services';
import { PerguntaModel } from 'src/app/models/pergunta.model';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ArquivoModel } from 'src/app/models/arquivo.model';

@Component({
  templateUrl: './pergunta-delete.component.html',
  styleUrls: ['./pergunta-delete.component.css']
})

export class PerguntaDeleteComponent implements OnInit {

  errorMessage!: string;
  permissao: boolean = this.autenticacao.permissao;
  pergunta: PerguntaModel = new PerguntaModel();
  arquivos: ArquivoModel[] = [];

  constructor(
    private perguntaServices: PerguntaServices,
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
        // Busca os detalhes da pergunta
        this.perguntaServices.findById(id)
          .subscribe(pergunta => {
            this.pergunta = pergunta;
            console.log(this.pergunta);
          });
        // Busca os arquivos associados à pergunta
        this.perguntaServices.readAllArquivos()
          .subscribe(arquivos => {
            this.arquivos = arquivos.filter(arquivo => arquivo.pergunta === id);
            console.log(this.arquivos);
          });
      }
    });
  }
  

  perguntaDelete(id: any) {
    console.log(" **********PERGUNTADELETE*********", id);

    // Excluir a pergunta
    this.perguntaServices.delete(id).subscribe((status: boolean) => {
      if (status) {
        // Redireciona para a página de listagem de perguntas
        this.router.navigate(['/PerguntaList']);
        // Atualiza a URL na barra de endereço do navegador
        this.location.replaceState('/PerguntaList');
      } else {
        this.errorMessage = 'Unable to delete Pergunta';
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

  // Método para verificar se o nome do arquivo corresponde a um tipo de imagem
  isImageType(fileName: string | undefined): boolean {
    return !!fileName && fileName.toLowerCase().endsWith('.png');
  }

  // Método para verificar se o nome do arquivo corresponde a um tipo de áudio
  isAudioType(fileName: string | undefined): boolean {
    return !!fileName && fileName.toLowerCase().endsWith('.ogg');
  }
}
