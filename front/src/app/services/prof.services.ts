import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfService {
  ProfSelecionado: string = 'ensino'; // Valor padrão

  constructor() {}

  setProf(tipo: string): void {
    this.ProfSelecionado = tipo;
  }

  getProf(): string {
    return this.ProfSelecionado;
  }
}
