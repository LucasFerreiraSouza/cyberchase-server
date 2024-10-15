import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements HttpInterceptor {
  URL: string = "http://localhost:8080";
  //URL: string = "https://cyberchase-qa.onrender.com";
  Token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.xZ4LTM0siSRQMQ9Hq2zkENAj5lNsRN3OYd-A33N_8XY";

  constructor() { }

  getToken() {
    return this.Token;
  }

  getApiUrl(): string {
    return this.URL;
  }

  // Método para interceptar requisições HTTP
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.getToken();
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next.handle(authReq);
  }
}


setInterval(() => {
  fetch('http://localhost:8080')
  //fetch('https://cyberchase-qa.onrender.com')
  .then(res => res.text())
  .then(data => console.log('Ping enviado com sucesso:', data))
  .catch(err => console.error('Erro ao enviar o ping:', err));
}, 100000);
