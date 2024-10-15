import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService} from './config.service'
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})


export class RecuperarSenhaService {
    private apiUrl = this.ConfigService.URL+"/api/usuarios";
    private token = this.ConfigService.Token;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    constructor(private http: HttpClient,private ConfigService:ConfigService) { }

    enviarEmailRecuperacao(email: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/recuperar-senha`, { email }, { headers: this.headers });
    }


    async validateToken(TOKEN: string): Promise<Boolean>{
      const url = `${this.apiUrl}/validate-token/${TOKEN}`

      console.log(TOKEN);

      const isTokenValid = await fetch(url,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
      })
      .then(res => res.json())
      .then(data => data)
      .catch((error) => {
        console.error('Error:', error);
      });

      return isTokenValid
    }

    async getTokenPayload(TOKEN: string){
      const url = `${this.apiUrl}/decode-token/${this.token}`
      let payload = {
        email: "",
        iat: -1,
        exp: -1
      }

      await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then((res) => res.json())
      .then((data) => payload = data)
      .catch((error) => {
        console.error('Erro ao buscar usuário:', error);
        return null;
      });

      return payload.email
    }
}
