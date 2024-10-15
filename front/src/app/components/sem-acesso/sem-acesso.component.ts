import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';


import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-sem-acesso',
  templateUrl: './sem-acesso.component.html',
  styleUrls: ['./sem-acesso.component.css']
})
export class SemAcessoComponent {

  permissao: boolean = this.autenticacao.permissao;

  constructor(
    private autenticacao: AutenticacaoService,
    private router: Router,

  ){}


}
