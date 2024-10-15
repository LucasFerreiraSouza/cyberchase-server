import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { ArquivoModel } from 'src/app/models/arquivo.model';
import { ArquivoServices } from 'src/app/services/arquivo.services';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-arquivo_list',
  templateUrl: './arquivo-list.component.html',
  styleUrls: ['./arquivo-list.component.css'],
})

export class ArquivoListComponent {
  arquivos?: ArquivoModel[]
  permissao: boolean = this.autenticacao.permissao;

  constructor(
      private arquivoServices: ArquivoServices,
      private router: Router,
      private autenticacao: AutenticacaoService
    ) {}

  ngOnInit(): void {
    this.carregarArquivos();
  }

  carregarArquivos(): void {
    this.arquivoServices.readAll().subscribe({
      next: (data) => {
        this.arquivos = data;
      },
      error: (e) => console.error(e)
    });
  }

  alterarArquivo(id: string) {
    this.router.navigate(['/ArquivoEdit', id]);
  }

  excluirArquivo(id: string) {
    this.router.navigate(['/ArquivoDelete', id]);
  }

  incluirArquivo() {
    this.router.navigate(['/ArquivoAdd']);
  }

  
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    this.router.navigate(['/login']);
  }
}
