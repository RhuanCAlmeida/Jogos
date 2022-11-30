import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController} from '@ionic/angular';
import { Jogo } from 'src/app/models/jogo';
import { JogoFirebaseService } from 'src/app/services/jogo-firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  formEditar: FormGroup;
  jogo: Jogo;
  edicao: boolean = true;
  isSubmitted: boolean = false;

  constructor(private router: Router, 
    private alertController: AlertController, 
    private jogosService: JogoFirebaseService, 
    private formBuilder: FormBuilder) {
      const nav = this.router.getCurrentNavigation();
      this.jogo = nav.extras.state.objeto;
    }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.jogo = nav.extras.state.objeto;
    this.formEditar = this.formBuilder.group({
      nome: [this.jogo.nome, [Validators.required, Validators.minLength(1)]],
      genero: [this.jogo.genero, [Validators.required, Validators.minLength(1)]],
      dev: [this.jogo.dev, [Validators.required, Validators.minLength(1)]],
      preco: [this.jogo.preco, [Validators.required, Validators.minLength(10) ]],
      plataforma: [this.jogo.plataforma, [Validators.required]],
      estilo: [this.jogo.estilo, [Validators.required]],
      data_lancamento: [this.jogo.data_lancamento, [Validators.required]]
      });
  }


  alterarEdicao(): void{
    if(this.edicao == false){
      this.edicao = true;
    }else{
      this.edicao = false;
    }
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.formEditar.valid){
      this.presentAlert("Descrição", "Erro no Cadastro", "Todos os Campos são obrigatórios!");
      return false;
    }else{
      this.salvar();
    }
  }

  salvar(){
      this.jogosService.editarJogo(this.jogo.id, this.formEditar.value)
      .then(()=>{
        this.presentAlert('Descrição', 'Editar', 'Jogo Editado com Sucesso!');
        this.router.navigate(['/home']);
      })
      .catch(()=>{
        this.presentAlert('Descrição', 'Editar', 'Erro ao editar')
      })
    }

  excluir(){
    this.presentConfirmAlert("Descrição", "Excluir Jogo", "Você deseja realmente excluir o jogo?");
    
  }

  private excluirJogo(){
    this.jogosService.excluirJogo(this.jogo.id)
    .then(()=>{
      this.presentAlert('Descrição', 'Excluir', 'Jogo excluido com sucesso');
      this.router.navigate(['/home']);
    })
    .catch(()=>{
      this.presentAlert('Descrição', 'Excluir', 'Erro ao excluir!');
    })
  }

  async presentConfirmAlert(titulo: string, subtitulo: string, msg: string) {
     const alert = await this.alertController.create({
       header: titulo,
       subHeader: subtitulo,
       message: msg,
       buttons: [
        {text: "Cancelar",
         role: "Cancelar",
         handler: ()=>{console.log("Cancelar")}},
        {
          text: "Confirmar",
          role: "Confirmar",
          handler: (acao)=>{
            this.excluirJogo();
          }
        }
       ],
     });
    
      await alert.present();
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

}
