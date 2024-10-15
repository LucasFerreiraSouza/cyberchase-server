import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { ArquivoServices } from 'src/app/services/arquivo.services';
import { ArquivoModel } from 'src/app/models/arquivo.model';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  templateUrl: './arquivo-delete.component.html',
  styleUrls: ['./arquivo-delete.component.css']
})

export class ArquivoDeleteComponent implements OnInit {

  errorMessage!: string;
  permissao: boolean = this.autenticacao.permissao;

  constructor(
    public arquivo: ArquivoModel,
    private arquivoServices: ArquivoServices,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private autenticacao: AutenticacaoService
  ) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] == undefined) {
        console.log('** Não Encontrou Parâmetro');
      } else {
        const id = params['id'];
        this.arquivoServices.findById(id)
          .subscribe(arquivo => this.arquivo = arquivo);
      }
    });
  }

}
