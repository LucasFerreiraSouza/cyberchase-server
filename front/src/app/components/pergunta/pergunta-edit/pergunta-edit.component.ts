import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { PerguntaServices } from 'src/app/services/pergunta.services';
import { PerguntaModel } from 'src/app/models/pergunta.model';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ArquivoServices } from 'src/app/services/arquivo.services';
import { ArquivoModel } from 'src/app/models/arquivo.model';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../services/config.service';
import { Observable, Observer } from 'rxjs';

@Component({
  templateUrl: './pergunta-edit.component.html',
  styleUrls: ['./pergunta-edit.component.css']
})
export class PerguntaEditComponent implements OnInit {
  
  pergunta!: PerguntaModel;
  arquivos: ArquivoModel[] = [];
  permissao: boolean = this.autenticacaoService.permissao;
  errorMessage!: string;
  message = '';
  selectedImage: File | null = null;
  selectedAudio: File | null = null;
  tempoRadio:  string ="não";
  previewImage: string | ArrayBuffer | null = null;
  previewAudio: string | ArrayBuffer | null = null;
  disciplinasUsuario: string[] = [];
  disciplinas: { sigla: string; nomeCompleto: string; cor: string; }[] = []; // Adicionando a propriedade cor
  selectedDisciplina: string | null = null; // Adicionando a propriedade selectedDisciplina

  constructor(
    private perguntaServices: PerguntaServices,
    private arquivoServices: ArquivoServices,
    private route: ActivatedRoute,
    private location: Location,
    private configService: ConfigService,
    private autenticacaoService: AutenticacaoService,
    private http: HttpClient
  ) { }

  getNomeCompleto(sigla: string): string {
    const disciplinaEncontrada = this.disciplinas.find(d => d.sigla === sigla);
    return disciplinaEncontrada ? disciplinaEncontrada.nomeCompleto : '';
  }

  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id) {
        this.perguntaServices.findById(id).subscribe(pergunta => {
          this.pergunta = pergunta;
  
          // Converte milissegundos para segundos
          this.pergunta.T = this.pergunta.T ? this.pergunta.T / 60 : 0;
  
          this.pergunta.disciplina = this.pergunta.disciplina || { sigla: '', nomeCompleto: '', cor: '' };
          this.selectedDisciplina = this.pergunta.disciplina.sigla; 
          this.carregarArquivos();
          this.carregarDisciplinasUsuario();
          this.atualizarAlternativas();
  
          // Define o estado do rádio com base no tempo
          this.tempoRadio = this.pergunta.T > 0 ? 'sim' : 'nao'; 
        });
      } else {
        console.log('** Não Encontrou Parâmetro');
      }
    });
  
    // Carregando disciplinas e filtrando a disciplina "Admin"
    this.disciplinas = this.autenticacaoService.getUserDisciplinas()
      .filter(disciplina => disciplina.sigla !== 'admin');
  }
  
  
    

  onTempoChange(): void {
    if (this.tempoRadio === 'sim') {
      this.pergunta.T = this.pergunta.T || 0; // Se T estiver undefined, inicialize como 0
    } else {
      this.pergunta.T = 0; // Se não for 'sim', Zere o tempo
    }
  }
  


  carregarDisciplinasUsuario(): void {
    this.disciplinasUsuario = this.disciplinas
      .filter(disciplina => disciplina.sigla !== 'admin')
      .map(disciplina => disciplina.sigla);
  }

  carregarArquivos(): void {
    // Carregar arquivos associados à pergunta, se houver
    this.arquivoServices.readAll().subscribe(arquivos => {
      this.arquivos = arquivos.filter(arquivo => arquivo.pergunta === this.pergunta.id);
      this.previewImage = this.arquivos.find(arquivo => arquivo.base64?.startsWith('data:image/png'))?.base64 || null;
      this.previewAudio = this.arquivos.find(arquivo => arquivo.base64?.startsWith('data:audio/ogg'))?.base64 || null;
    });

  }

  atualizarAlternativas(): void {
    const alternativaCorreta = this.pergunta.C_A;
    switch (alternativaCorreta) {
      case 'A':
        this.pergunta.A2 = 'B';
        this.pergunta.A3 = 'C';
        this.pergunta.A4 = 'D';
        this.pergunta.A5 = 'E';
        break;
      case 'B':
        this.pergunta.A2 = 'A';
        this.pergunta.A3 = 'C';
        this.pergunta.A4 = 'D';
        this.pergunta.A5 = 'E';
        break;
      case 'C':
        this.pergunta.A2 = 'A';
        this.pergunta.A3 = 'B';
        this.pergunta.A4 = 'D';
        this.pergunta.A5 = 'E';
        break;
      case 'D':
        this.pergunta.A2 = 'A';
        this.pergunta.A3 = 'B';
        this.pergunta.A4 = 'C';
        this.pergunta.A5 = 'E';
        break;
      case 'E':
        this.pergunta.A2 = 'A';
        this.pergunta.A3 = 'B';
        this.pergunta.A4 = 'C';
        this.pergunta.A5 = 'D';
        break;
      default:
        break;
    }
  }





  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  onAudioSelected(event: any): void {
  this.selectedAudio = event.target.files[0];
  if (this.selectedAudio) {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewAudio = reader.result;
    };
    reader.readAsDataURL(this.selectedAudio);
  }
}

  
  

  uploadFiles(): void {
    let uploadCount = 0;
    const totalFiles = (this.selectedImage ? 1 : 0) + (this.selectedAudio ? 1 : 0);
  
    if (this.selectedImage) {
      const existingImage = this.arquivos.find(arquivo => arquivo.base64?.startsWith('data:image/png'));
      if (existingImage) {
        // Atualiza o arquivo existente
        this.updateFile(this.selectedImage, 'image', existingImage.id).subscribe(() => {
          uploadCount++;
          if (uploadCount === totalFiles) {
            this.carregarArquivos(); // Recarregar arquivos após o upload
          }
        });
      } else {
        // Faz upload do novo arquivo
        this.uploadFile(this.selectedImage, 'image').subscribe(() => {
          uploadCount++;
          if (uploadCount === totalFiles) {
            this.carregarArquivos(); // Recarregar arquivos após o upload
          }
        });
      }
    }
  
    if (this.selectedAudio) {
      const existingAudio = this.arquivos.find(arquivo => arquivo.base64?.startsWith('data:audio/ogg'));
      if (existingAudio) {
        // Atualiza o arquivo existente
        this.updateFile(this.selectedAudio, 'audio', existingAudio.id).subscribe(() => {
          uploadCount++;
          if (uploadCount === totalFiles) {
            this.carregarArquivos(); // Recarregar arquivos após o upload
          }
        });
      } else {
        // Faz upload do novo arquivo
        this.uploadFile(this.selectedAudio, 'audio').subscribe(() => {
          uploadCount++;
          if (uploadCount === totalFiles) {
            this.carregarArquivos(); // Recarregar arquivos após o upload
          }
        });
      }
    }
  }
  


  uploadFile(file: File, type: 'image' | 'audio'): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result?.toString();
        if (result) {
          // Adiciona o prefixo correto para o base64
          const prefix = type === 'image' ? 'data:image/png;base64,' : 'data:audio/ogg;base64,';
          const base64String = result.split(',')[1];
          if (base64String) {
            const arquivo: ArquivoModel = {
              nome: file.name,
              base64: prefix + base64String,
              pergunta: this.pergunta.id
            };


            this.arquivoServices.create(arquivo).subscribe({
              next: (res) => {
                console.log(`${type === 'image' ? 'Imagem' : 'Áudio'} enviado com sucesso!`, res);
                observer.next(res);
                observer.complete();
              },
              error: (e) => {
                console.error(`Erro ao enviar ${type}`, e);
                observer.error(e);
              }
            });
          } else {
            observer.error('Falha ao ler o arquivo');
          }
        } else {
          observer.error('Falha ao ler o arquivo');
        }
      };
      reader.readAsDataURL(file);
    });
  }

  perguntaEdit(): void {
    if (!this.validarPergunta()) return;
  
    // Verifique se selectedDisciplina está definido e obtenha o objeto correspondente
    const disciplinaSelecionada = this.disciplinas.find(d => d.sigla === this.selectedDisciplina);
    this.pergunta.disciplina = disciplinaSelecionada || { sigla: '', nomeCompleto: '' }; // Atribua um objeto válido
  
    this.atualizarAlternativas(); // Garante que as alternativas sejam atualizadas
  
    // Atualiza a pergunta
    this.perguntaServices.update(this.pergunta.id, this.pergunta).subscribe({
      next: (res) => {
        this.message = res.message ? res.message : 'Pergunta atualizada com sucesso!';
  
        // Se houver arquivos selecionados, faça o upload
        this.uploadFiles();
  
        this.location.back(); // Volta para a página anterior
      },
      error: (e) => console.error(e)
    });
  }
  
  
  updateFile(file: File, type: 'image' | 'audio', id: number): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result?.toString();
        if (result) {
          const prefix = type === 'image' ? 'data:image/png;base64,' : 'data:audio/ogg;base64,';
          const base64String = result.split(',')[1];
          if (base64String) {
            const arquivo: ArquivoModel = {
              nome: file.name,
              base64: prefix + base64String,
              pergunta: this.pergunta.id
            };

            this.arquivoServices.update(id, arquivo).subscribe({
              next: (res) => {
                console.log(`Atualização de ${type === 'image' ? 'Imagem' : 'Áudio'} com sucesso!`, res);
                observer.next(res);
                observer.complete();
              },
              error: (e) => {
                console.error(`Erro ao atualizar ${type}`, e);
                observer.error(e);
              }
            });
          } else {
            observer.error('Falha ao ler o arquivo');
          }
        } else {
          observer.error('Falha ao ler o arquivo');
        }
      };
      reader.readAsDataURL(file);
    });
  }

  validarPergunta(): boolean {
    // Validação simples para garantir que todos os campos necessários estejam preenchidos
    return true;
  }
}


