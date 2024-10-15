import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PerguntaServices } from 'src/app/services/pergunta.services';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProfService } from 'src/app/services/prof.services';
import { ConfigService } from '../../../services/config.service';

@Component({
  templateUrl: './pergunta-add.component.html',
  styleUrls: ['./pergunta-add.component.css']
})
export class PerguntaAddComponent implements OnInit {
  permissao: boolean = this.autenticacao.permissao;
  
  // Ajustado para ser um array de objetos com sigla e nomeCompleto
  disciplinasUsuario: { sigla: string; nomeCompleto: string; cor: string; }[] = [];
  
  public selectedDisciplina: { sigla: string; nomeCompleto: string; cor: string; } = { sigla: '', nomeCompleto: '',cor:'' };

  public newPergunta = {
    disciplina: {
      sigla: '',
      nomeCompleto: '',
      cor:''
    },
    tipo: this.ProfService.getProf(),
    GUID: '',
    E: 0,
    Q_T: 5,
    T: 0,
    I: '0',
    A: '0',
    Q: '',
    C_A: '',
    A2: '',
    A3: '',
    A4: '',
    A5: '',
    descricao: '',
    A3_Why: '0',
    A4_Why: '0',
    A5_Why: '0',
    C_S: '0',
    S: '0',
    R_T: 'AddState',
    R_I: '2',
    R_A: '1',
    P_T: 'RemoveState',
    P_I: '2',
    P_A: '1',
    O_L: '0',
    usuario: '',
    arquivos: [] as { nome: string, base64: string }[] // Mantido para armazenar arquivos com nome e base64
  };
  
  settipo(tipo: string): void {
    this.newPergunta.tipo = tipo;
  }

  public newArquivo = {
    'nome': '',
    'base64': '', // Mantido para base64
    'pergunta': ''
  };

  public mensagem: string | undefined;
  selectedImage: File | null = null;
  selectedAudio: File | null = null;
  arquivoEnviado: boolean = false;
  tempoRadio: string = 'nao';

  previewImage: string | ArrayBuffer | null = null;
  previewAudio: string | ArrayBuffer | null = null;

  constructor(
    private perguntaServices: PerguntaServices,
    private location: Location,
    private autenticacao: AutenticacaoService,
    private http: HttpClient,
    private router: Router,
    private ConfigService: ConfigService,
    private ProfService: ProfService
  ) { }

  ngOnInit(): void {
    const userId = this.autenticacao.getUserId();
    if (!userId) {
      console.error('ID do usuário não encontrado.');
      return;
    }
  
    this.newPergunta.usuario = userId;
  
    // Ajustado para garantir que disciplinasUsuario é um array de objetos
    const disciplinas = this.autenticacao.getUserDisciplinas();
    this.disciplinasUsuario = disciplinas.filter(disciplina => disciplina.sigla !== 'admin');
  
    // Verifica se há disciplinas disponíveis
    if (this.disciplinasUsuario.length > 0) {
      // Define a sigla e o nome completo da disciplina selecionada
      this.selectedDisciplina = this.disciplinasUsuario[0]; // Armazena a disciplina completa
      
  
      // Atualiza a nova pergunta com a disciplina selecionada
      this.newPergunta.disciplina.sigla = this.selectedDisciplina.sigla;
      this.newPergunta.disciplina.nomeCompleto = this.selectedDisciplina.nomeCompleto;
      this.newPergunta.disciplina.cor = this.selectedDisciplina.cor; // Define a cor
    }
    this.newPergunta.C_A = 'A';
  }
  
  // Método para lidar com a mudança de disciplina
  onDisciplinaChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    
    // Encontra a disciplina selecionada na lista de disciplinas do usuário
    const disciplinaSelecionada = this.disciplinasUsuario.find(d => d.sigla === selectedValue);
    
    if (disciplinaSelecionada) {
      this.selectedDisciplina = disciplinaSelecionada;
      this.newPergunta.disciplina.sigla = disciplinaSelecionada.sigla;
      this.newPergunta.disciplina.nomeCompleto = disciplinaSelecionada.nomeCompleto;
    }
  }




  
  onTempoChange() {
    if (this.tempoRadio === 'nao') {
      this.newPergunta.T = 0;
    }
    if (this.tempoRadio === 'sim' && (this.newPergunta.T === undefined || this.newPergunta.T === null)) {
      this.mensagem = 'Por favor, insira o tempo.';
      return;
    }
  }

  async createPergunta(): Promise<void> {
    const alternativaCorreta = this.newPergunta.C_A;
    switch (alternativaCorreta) {
      // ... (seu código para alternativa correta)
      case 'A':
        this.newPergunta.A2 = 'B';
        this.newPergunta.A3 = 'C';
        this.newPergunta.A4 = 'D';
        this.newPergunta.A5 = 'E';
        break;
      case 'B':
        this.newPergunta.A2 = 'A';
        this.newPergunta.A3 = 'C';
        this.newPergunta.A4 = 'D';
        this.newPergunta.A5 = 'E';
        break;
      case 'C':
        this.newPergunta.A2 = 'A';
        this.newPergunta.A3 = 'B';
        this.newPergunta.A4 = 'D';
        this.newPergunta.A5 = 'E';
        break;
      case 'D':
        this.newPergunta.A2 = 'A';
        this.newPergunta.A3 = 'B';
        this.newPergunta.A4 = 'C';
        this.newPergunta.A5 = 'E';
        break;
      case 'E':
        this.newPergunta.A2 = 'A';
        this.newPergunta.A3 = 'B';
        this.newPergunta.A4 = 'C';
        this.newPergunta.A5 = 'D';
        break;
      default:
        break;  
    }

    // Verificação de arquivos
    if (!this.selectedImage && !this.selectedAudio) {
      this.mensagem = 'Por favor, selecione pelo menos uma imagem ou um áudio.';
      return;
    }

    // Verificação de tempo
    if (this.tempoRadio === 'sim' && (this.newPergunta.T < 30 || this.newPergunta.T > 300)) {
      this.mensagem = 'Por favor, insira um tempo válido entre 30 segundos e 300 segundos.';
      return;
    }

    if (this.arquivoEnviado) {
      return;
    }

    try {
      // Criação da pergunta
      const response = await this.perguntaServices.create(this.newPergunta).toPromise();
      this.mensagem = 'Pergunta criada com sucesso!';
      const novaPerguntaId = response.id;
      this.newArquivo.pergunta = novaPerguntaId;

      // Envio de arquivos
      const uploadPromises: Promise<any>[] = [];

      if (this.selectedImage) {
        this.newArquivo.nome = this.selectedImage.name;
        this.newArquivo.base64 = await this.convertToBase64(this.selectedImage, 'image');
        uploadPromises.push(this.perguntaServices.createArquivo(this.newArquivo).toPromise());
      }

      if (this.selectedAudio) {
        this.newArquivo.nome = this.selectedAudio.name;
        this.newArquivo.base64 = await this.convertToBase64(this.selectedAudio, 'audio');
        uploadPromises.push(this.perguntaServices.createArquivo(this.newArquivo).toPromise());
      }

      await Promise.all(uploadPromises);
      this.location.back();
    } catch (error) {
      console.error('Erro ao criar a pergunta:', error);
      this.mensagem = 'Erro ao criar a pergunta. Por favor, tente novamente mais tarde.';
    }
  }

  onFileSelected(event: any, type: string) {
    const file: File = event.target.files[0];

    if (type === 'audio') {
      if (file.type !== 'audio/ogg') {
        this.mensagem = 'Somente arquivos .ogg são permitidos para áudio.';
        this.selectedAudio = null;
        this.previewAudio = null;
        return;
      }

      this.selectedAudio = file;
      this.clearErrorMessage();

      // Atualize a visualização do áudio após a conversão para Base64
      this.convertToBase64(file, 'audio').then((base64) => {
        this.previewAudio = base64; // Atualiza a visualização do áudio
      }).catch(error => {
        console.error('Erro ao converter áudio para Base64:', error);
      });
    }

    if (type === 'image') {
      if (!this.isImageTypeValid(file)) {
        this.mensagem = 'Somente arquivos .png são permitidos para imagens.';
        this.selectedImage = null;
        this.previewImage = null;
        return;
      }
      this.selectedImage = file;
      this.clearErrorMessage();

      // Atualize a visualização da imagem após a conversão para Base64
      this.convertToBase64(file, 'image').then((base64) => {
        this.previewImage = base64; // Atualiza a visualização da imagem
      }).catch(error => {
        console.error('Erro ao converter imagem para Base64:', error);
      });
    }
  }

  convertToBase64(file: File, tipo: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  isImageTypeValid(file: File): boolean {
    return file.type === 'image/png';
  }

  clearErrorMessage() {
    this.mensagem = undefined;
  }
}
