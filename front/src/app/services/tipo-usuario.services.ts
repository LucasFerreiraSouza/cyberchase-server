import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PerfilUsuarioService {
  tipoUsuarioSelecionado: string = 'ensino'; // Valor padrão

  constructor() {}

  setPerfilUsuario(tipo: string): void {
    this.tipoUsuarioSelecionado = tipo;
  }

  getPerfilUsuario(): string {
    return this.tipoUsuarioSelecionado;
  }
}
