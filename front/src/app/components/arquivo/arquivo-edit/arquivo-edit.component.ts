import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ArquivoServices } from 'src/app/services/arquivo.services';
import { ArquivoModel } from 'src/app/models/arquivo.model';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  templateUrl: './arquivo-edit.component.html',
  styleUrls: ['./arquivo-edit.component.css']
})
export class ArquivoEditComponent implements OnInit {

  arquivo!: ArquivoModel;
  permissao: boolean = this.autenticacao.permissao;
  errorMessage!: string;

  message = '';
  novoNome: string = ''; //Variável para armazenar o novo nome temporariamente

  constructor(
    private arquivoServices: ArquivoServices,
    private route: ActivatedRoute,
    private location: Location,
    private autenticacao: AutenticacaoService
    ) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] === undefined) {
          console.log('** Não Encontrou Parâmetro');
      } else {
          const id = params['id'];
          this.arquivoServices.findById(id)
              .subscribe(arquivo => {
                this.arquivo = arquivo;
                if (arquivo && arquivo.nome) {
                  this.novoNome = arquivo.nome; // Atribui o valor apenas se arquivo.nome não for undefined
                }
              });
        }
    });
  }

}