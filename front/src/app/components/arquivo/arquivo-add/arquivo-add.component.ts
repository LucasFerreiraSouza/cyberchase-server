import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importe o Router
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-arquivo-add',
  templateUrl: './arquivo-add.component.html',
  styleUrls: ['./arquivo-add.component.css']
})
export class ArquivoAddComponent implements OnInit {
  selectedFile: File | null = null;
  errorMessage: string | null = null; // Variável para armazenar a mensagem de erro

  permissao: boolean = this.autenticacao.permissao;

  constructor(
    private http: HttpClient,
    private router: Router,
    private autenticacao: AutenticacaoService
  ) {}

  ngOnInit(): void {
    console.log(this.permissao);
  }

}
