import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { JogoFirebaseService } from 'src/app/services/jogo-firebase.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  formCadastrar: FormGroup;
  isSubmitted: boolean = false;
  imagem: any;

  constructor(private alertController: AlertController, 
    private LoadingCtrl : LoadingController,
    private router: Router, 
    private authService: AuthService,
    private jogosService: JogoFirebaseService, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formCadastrar = this.formBuilder.group({
    nome: ["", [Validators.required, Validators.minLength(1)]],
    dev: ["", [Validators.required, Validators.minLength(1)]],
    genero: ["", [Validators.required, Validators.minLength(1)]],
    preco: ["", [Validators.required, Validators.minLength(10) ]],
    plataforma: ["", [Validators.required]],
    estilo: ["", [Validators.required]],
    data_lancamento: ['', [Validators.required]],
    imagem: ["",[Validators.required]],
    user_id: [this.authService.getUsuarioLogado() .uid]
    });
  }
    

  get errorControl(){
    return this.formCadastrar.controls;
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.formCadastrar.valid){
      this.presentAlert("Descrição", "Erro no Cadastro", "Todos os Campos são obrigatórios!");
      return false;
    }else{
      this.cadastrar();
    }
  }

  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

  private cadastrar(): void{
    this.showLoading("Aguarde", 100000);
    this.jogosService.enviarImagem(this.imagem, this.formCadastrar.value)
    .then(()=>{
      this.LoadingCtrl.dismiss();
      this.presentAlert("Lista", "Cadastrar", "Jogo Salvo!");
      this.router.navigate(['/home']);
    })
    .catch((error)=>{
      console.log(error);
      this.LoadingCtrl.dismiss();
      this.presentAlert("Lista", "Cadastrar", "Erro ao salvar o jogo!")
    })
}

async presentAlert(titulo: string, subtitulo: string, msg: string) {
  const alert = await this.alertController.create({
    header: titulo,
    subHeader: subtitulo,
    message: msg,
    buttons: ['OK'],
  });

  await alert.present();
}
async showLoading(message: string, duracao: number) {
  const loading = await this.LoadingCtrl.create({
    message: message,
    duration: duracao,
  });
  loading.present();
}

}