import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../models/usuario.model';
import { ConfigService} from './config.service'
import { HttpHeaders } from '@angular/common/http';
import { RecuperarSenhaService } from './recuperar-senha.service';


@Injectable({
  providedIn: 'root',
})

export class UsuarioServices {
  private token = this.ConfigService.Token;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  private urlUsuarios = this.ConfigService.URL+"/api/usuarios";
  private urlUsuario  = this.ConfigService.URL+"/api/usuarios";
  constructor(private http: HttpClient,private ConfigService:ConfigService, private recuperarSenhaServices: RecuperarSenhaService) {}

  create(data: any): Observable<any> {


    return this.http.post(this.urlUsuarios, data, { headers: this.headers });
  }

  readAll(): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(this.urlUsuarios, { headers: this.headers });
  }

  findById(id: any): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.urlUsuario}/${id}`, { headers: this.headers });
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.urlUsuario}/${id}`, data, { headers: this.headers });
  }

  delete(id: any): Observable<any> {
    return this.http.delete<UsuarioModel>(`${this.urlUsuario}/${id}`, { headers: this.headers });
  }


  async checkUser(email: string){

    const url = this.ConfigService.getApiUrl() + `/api/usuarios/find-by-email/` + email;

    console.log(url);


    const user = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.ConfigService.getToken()}`
      }
    })
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => {
      console.error('Erro ao buscar usuário:', error);
      return null;
    });

    return user;
  }


  requestResetPassword(email: string){
    const url = `${this.ConfigService.getApiUrl()}/api/usuarios/forgot-password/${encodeURIComponent(email)}`
    fetch(url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.ConfigService.getToken()}`
        }
    })
    .then(res => res.json())
    .then(data => console.log("Email sent to: " + data.email))
    .catch((error) => {
      console.error('Error:', error);
    });
  }


}
