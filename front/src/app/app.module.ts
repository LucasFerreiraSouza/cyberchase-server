import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { SemAcessoComponent } from './components/sem-acesso/sem-acesso.component';

import { PerguntaModel } from './models/pergunta.model';
import { PerguntaListComponent } from './components/pergunta/pergunta_list/pergunta-list.component';
import { PerguntaAddComponent } from './components/pergunta/pergunta-add/pergunta-add.component';
import { PerguntaEditComponent } from './components/pergunta/pergunta-edit/pergunta-edit.component';
import { PerguntaDeleteComponent } from './components/pergunta/pergunta-delete/pergunta-delete.component';

import { UsuarioModel } from './models/usuario.model';
import { UsuarioAddComponent } from './components/usuario/usuario-add/usuario-add.component';
import { UsuarioDeleteComponent } from './components/usuario/usuario-delete/usuario-delete.component';
import { UsuarioEditComponent } from './components/usuario/usuario-edit/usuario-edit.component';
import { UsuarioListComponent } from './components/usuario/usuario_list/usuario-list.component';

import { ArquivoModel } from './models/arquivo.model';
import { ArquivoAddComponent } from './components/arquivo/arquivo-add/arquivo-add.component';
import { ArquivoDeleteComponent } from './components/arquivo/arquivo-delete/arquivo-delete.component';
import { ArquivoEditComponent } from './components/arquivo/arquivo-edit/arquivo-edit.component';
import { ArquivoListComponent } from './components/arquivo/arquivo_list/arquivo-list.component';

import { AdminComponent } from './components/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EsqueciSenhaComponent } from './components/esqueci-senha/esqueci-senha.component';
import { ProfComponent } from './components/prof/prof.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';

// Importe o ConfigService
import { ConfigService } from './services/config.service';

@NgModule({
  declarations: [
    AppComponent,
    PerguntaListComponent,
    PerguntaAddComponent,
    PerguntaEditComponent,
    PerguntaDeleteComponent,
    
    UsuarioAddComponent,
    UsuarioDeleteComponent,
    UsuarioEditComponent,
    UsuarioListComponent,

    ArquivoAddComponent,
    ArquivoDeleteComponent,
    ArquivoEditComponent,
    ArquivoListComponent,

    LoginComponent,
    SemAcessoComponent,
    AdminComponent,
    EsqueciSenhaComponent,
    ProfComponent,
    PerfilUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    PerguntaModel, 
    UsuarioModel, 
    ArquivoModel,
    ConfigService, // Adicione o ConfigService aqui
    { provide: HTTP_INTERCEPTORS, useClass: ConfigService, multi: true } // Adicione o ConfigService como interceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
