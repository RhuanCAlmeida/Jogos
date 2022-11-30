import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Jogo } from '../models/jogo';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { StringifyOptions } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class JogoFirebaseService {
private PATH : string = 'jogos';

  constructor(private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage) { }

  getJogo(id : string){
    return this.angularFirestore.collection(this.PATH).doc(id).valueChanges();
  }

  getJogos(){
    return this.angularFirestore.collection(this.PATH).snapshotChanges();
  }
  getJogosWithId(user_id: string){
    return this.angularFirestore.collection(this.PATH,
      ref=> ref.where('user_id', '==', user_id)).snapshotChanges();
  }

  inserirJogo(jogo: Jogo){
    return this.angularFirestore.collection(this.PATH).add({
      nome: jogo.nome, preco: jogo.preco,
      genero: jogo.genero, data_lancamento: jogo.data_lancamento,
      plataforma: jogo.plataforma, dev: jogo.dev, estilo: jogo.estilo,
      downloadURL: jogo.downloadURL
    });
  }

  editarJogo(jogo: Jogo, id: string){
   return this.angularFirestore.collection(this.PATH).doc(id).update({
    nome: jogo.nome, preco: jogo.preco,
    genero: jogo.genero, data_lancamento: jogo.data_lancamento,
    plataforma: jogo.plataforma, dev: jogo.dev, estilo: jogo.estilo
    });
  }
  excluirJogo(id: string){
    return this.angularFirestore.collection(this.PATH).doc(id).delete();
  }

  enviarImagem(imagem: any, jogo: Jogo){
    const file = imagem.item(0);
    if(file.type.split('/')[0] !== 'image')
    {
      console.log("Tipo não Suportado!");
      return;
    }
  const path = `avatar/${new Date().getTime()}_${file.name}`;
  const fileRef = this.angularFireStorage.ref(path);
  let task = this.angularFireStorage.upload(path, file);

  task.snapshotChanges().pipe(
    finalize(()=>{
      let uploadFileURL = fileRef.getDownloadURL();
      uploadFileURL.subscribe(resp=>{
        jogo.downloadURL = resp;
        this.inserirJogo(jogo);
      })
    })
  ).subscribe()
  return task;
}


}
