import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  formLogar: FormGroup;
  isSubmitted : boolean = false;
 
  constructor(private alertController: AlertController,
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formLogar = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      senha: ["", [Validators.required, Validators.minLength(6)]],
    });
  }
  get errorControl(){
    return this.formLogar.controls;
  }
  submitForm(){
    console.log("dentro do submit")
    this.isSubmitted = true;
    if(!this.formLogar.valid){
      this.presentAlert("Lista", "Erro ao logar", "Todos os Campos são obrigatórios!");
      return false;
    }else{
      this.logar();
    }
  }

  private logar(){
    console.log("dentro do logar")
    this.auth.signIn(this.formLogar.value['email'],
      this.formLogar.value['senha'])
      .then((res) =>{
      this.presentAlert("Lista", "Login", "Login Efetuado");
      this.router.navigate(['/home']);
    })
      .catch((error) =>{
        this.presentAlert("Lista", "Erro", "Tente Novamente!");
        console.log(error);
      })
  }

  signinGoogle(){
    this.auth.signWithGoogle();
  }

  irParaSignUp(){
    this.router.navigate(['/signup']);
  }


  async presentAlert(titulo: string, subtitulo: string, msg: string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: msg,
      buttons: ['OK'],
    });
  }
}
