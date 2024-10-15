import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArquivoModel } from '../models/arquivo.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class ArquivoServices {

  private urlArquivos = `${this.ConfigService.URL}/api/arquivos`;
  private token = this.ConfigService.Token;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(private http: HttpClient, private ConfigService: ConfigService) {}

  create(data: ArquivoModel): Observable<any> {
    // Certifique-se de que 'data' contém o campo 'base64' e 'nome'
    return this.http.post(this.urlArquivos, data, { headers: this.headers });
  }

  readAll(): Observable<ArquivoModel[]> {
    return this.http.get<ArquivoModel[]>(this.urlArquivos, { headers: this.headers });
  }

  findById(id: any): Observable<ArquivoModel> {
    return this.http.get<ArquivoModel>(`${this.urlArquivos}/${id}`, { headers: this.headers });
  }

  update(id: number, data: ArquivoModel): Observable<any> {
    return this.http.put<any>(`${this.urlArquivos}/${id}`, data, { headers: this.headers });
  }
  

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.urlArquivos}/${id}`, { headers: this.headers });
  }
}
