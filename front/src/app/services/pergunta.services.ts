import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { PerguntaModel } from '../models/pergunta.model';
import { ArquivoModel } from '../models/arquivo.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class PerguntaServices {

  private urlPerguntas = this.ConfigService.URL + "/api/perguntas";
  private urlArquivos = this.ConfigService.URL + "/api/arquivos";
  private token = this.ConfigService.Token;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(private http: HttpClient, private ConfigService: ConfigService) {}

  create(data: any): Observable<any> {
    return this.http.post(this.urlPerguntas, data, { headers: this.headers });
  }

  createArquivo(arquivo: ArquivoModel): Observable<any> {
    return this.http.post(this.urlArquivos, arquivo, { headers: this.headers });
  }

  readAll(): Observable<PerguntaModel[]> {
    return forkJoin([
      this.http.get<PerguntaModel[]>(this.urlPerguntas, { headers: this.headers }),
      this.http.get<ArquivoModel[]>(this.urlArquivos, { headers: this.headers })
    ]).pipe(
      map(([perguntas, arquivos]) => {
        return perguntas.map(pergunta => {
          pergunta.arquivos = arquivos.filter(arquivo => arquivo.pergunta === pergunta.id);
          return pergunta;
        });
      })
    );
  }

  readAllArquivos(): Observable<ArquivoModel[]> {
    return this.http.get<ArquivoModel[]>(this.urlArquivos, { headers: this.headers });
  }

  findById(id: any): Observable<PerguntaModel> {
    return this.http.get<PerguntaModel>(`${this.urlPerguntas}/${id}`, { headers: this.headers });
  }

  findByIdWithoutFiles(id: any): Observable<PerguntaModel> {
    return this.http.get<PerguntaModel>(`${this.urlPerguntas}/${id}`, { headers: this.headers });
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.urlPerguntas}/${id}`, data, { headers: this.headers });
  }

  delete(id: any): Observable<any> {
    return this.http.delete<PerguntaModel>(`${this.urlPerguntas}/${id}`, { headers: this.headers });
  }
}
