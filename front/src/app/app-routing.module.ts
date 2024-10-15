import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component'; 

import { PerguntaListComponent } from './components/pergunta/pergunta_list/pergunta-list.component';
import { PerguntaAddComponent } from  './components/pergunta/pergunta-add/pergunta-add.component';
import { PerguntaEditComponent } from './components/pergunta/pergunta-edit/pergunta-edit.component';
import { PerguntaDeleteComponent } from './components/pergunta/pergunta-delete/pergunta-delete.component';

import { UsuarioListComponent } from './components/usuario/usuario_list/usuario-list.component';
import { UsuarioAddComponent } from './components/usuario/usuario-add/usuario-add.component';
import { UsuarioEditComponent } from './components/usuario/usuario-edit/usuario-edit.component';
import { UsuarioDeleteComponent } from './components/usuario/usuario-delete/usuario-delete.component';


import { ArquivoListComponent } from './components/arquivo/arquivo_list/arquivo-list.component';
import { ArquivoAddComponent } from './components/arquivo/arquivo-add/arquivo-add.component';
import { ArquivoEditComponent } from './components/arquivo/arquivo-edit/arquivo-edit.component';
import { ArquivoDeleteComponent } from './components/arquivo/arquivo-delete/arquivo-delete.component';
import { EsqueciSenhaComponent } from './components/esqueci-senha/esqueci-senha.component';
import { ProfComponent } from './components/prof/prof.component';

import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';




const routes: Routes = [


  { path: 'PerguntaList',       component: PerguntaListComponent, pathMatch: 'full' },
  { path: 'PerguntaAdd',        component: PerguntaAddComponent, pathMatch: 'full' },
  { path: 'PerguntaEdit/:id',   component: PerguntaEditComponent, pathMatch: 'full'},
  { path: 'PerguntaDelete/:id', component: PerguntaDeleteComponent, pathMatch: 'full' },
  { path: 'UsuarioList',        component: UsuarioListComponent, pathMatch: 'full' },
  { path: 'UsuarioAdd',         component: UsuarioAddComponent, pathMatch: 'full' },
  { path: 'UsuarioEdit/:id',    component: UsuarioEditComponent, pathMatch: 'full' },
  { path: 'UsuarioDelete/:id',  component: UsuarioDeleteComponent, pathMatch: 'full' },
  { path: 'ArquivoList',        component: ArquivoListComponent, pathMatch: 'full' },
  { path: 'ArquivoAdd',         component: ArquivoAddComponent, pathMatch: 'full' },
  { path: 'ArquivoEdit/:id',    component: ArquivoEditComponent, pathMatch: 'full' },
  { path: 'ArquivoDelete/:id',  component: ArquivoDeleteComponent, pathMatch: 'full' },
  { path: 'login',              component: LoginComponent, pathMatch: 'full' },
  { path: 'admin',              component: AdminComponent, pathMatch: 'full' },
  { path: 'prof',               component: ProfComponent,pathMatch: 'full' },
  { path: 'perfil-usuario',       component: PerfilUsuarioComponent,pathMatch: 'full' },
  { path: '',                   component: LoginComponent },


  { path: 'upload-arquivo/add', component: PerguntaAddComponent },
  { path: 'upload-arquivo/edit/:id', component: PerguntaEditComponent },
  { path: 'esqueci-senha', component: EsqueciSenhaComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
