import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { Jogo } from '../../models/jogo';
import { JogoFirebaseService } from '../../services/jogo-firebase.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  jogos: Jogo[];


  constructor(private router: Router,
    private auth: AuthService,
    private jogoService: JogoFirebaseService) {
      console.log(this.auth.getUsuarioLogado());
      this.jogoService.getJogosWithId(this.auth.getUsuarioLogado().uid)
      .subscribe(resp=>{
        this.jogos = resp.map(jogo=>{
          return{
            id : jogo.payload.doc.id,
             ...jogo.payload.doc.data() as Jogo
          }as Jogo
        })
      })
  }

  irParaCadastroPage(): void{
    this.router.navigate(['/cadastro']);
  }

  irParaDetalharPage(jogo: Jogo){
    this.router.navigateByUrl('/detalhar', {
      state: {objeto:jogo}
    });
  }
  deslogar(){
    this.auth.signOut()
    .then(() => {this.router.navigate(['/signin'])});
  }
}
