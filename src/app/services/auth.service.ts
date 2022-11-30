import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from "firebase/auth";
import Usuario from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarioDados: any;

  constructor(
    private angularFirestore: AngularFirestore,
    private angularAuth: AngularFireAuth,
    private router: Router,
    private ngZone:NgZone) { 
      this.angularAuth.authState.subscribe(user => {
        if(user){
          this.usuarioDados = user;
          localStorage.setItem('user', JSON.stringify(this.usuarioDados));
          JSON.parse(localStorage.getItem('user'));
        }else{
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      });
     }

    public signIn(email: string, password: string){
      return this.angularAuth.signInWithEmailAndPassword(email, password);
    }
    
    public signNup(email: string, password: string){
      return this.angularAuth.createUserWithEmailAndPassword(email, password);
    }

    public recoverPassword(email:string){
      return this.angularAuth.sendPasswordResetEmail(email);
    }

    public signOut(){
      return this.angularAuth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['signIn']);
      })
    }

    private authLogin(provider){
      return this.angularAuth.signInWithPopup(provider)
      .then((result) =>{
        this.router.navigate(['home']);
      })
    }

    public signWithGoogle(){
      this.authLogin(new GoogleAuthProvider);
    }
    
    public estaLogado() : boolean{
      const user = JSON.parse(localStorage.getItem('user'));
      if(user){
        return true;
      }else{
        return false;
      }
    }
    public getUsuarioLogado() : Usuario{
      const user = JSON.parse(localStorage.getItem('user'));
      if(user){
        return user;
      }else{
        return null;
      }
    }
}
