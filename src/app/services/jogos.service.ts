import { Injectable } from '@angular/core';
import { Jogo } from '../models/jogo';

@Injectable({
  providedIn: 'root'
})
export class JogosService {
  private _jogos: Jogo[] = [];

  constructor() {
    let jogo: Jogo = new Jogo("teste", 
    123, "windows", "2022-08-10", "Actvision", "ação", "coop");
    this.inserir(jogo);
   }

  inserir(jogo: Jogo): void{
    this._jogos.push(jogo);
  }

  editar(jogo: Jogo, nome: string, genero: string, dev: string, preco: number,
    estilo: string, plataforma: string, data_lancamento: string): boolean{
    for(let i=0; i< this._jogos.length; i++){
      if(this._jogos[i].id == jogo.id){
        this._jogos[i].nome = nome;
        this._jogos[i].genero = genero;
        this._jogos[i].dev = dev;
        this._jogos[i].preco = preco;
        this._jogos[i].plataforma = plataforma;
        this._jogos[i].estilo = estilo
        this._jogos[i].data_lancamento = data_lancamento;
        return true;
      }
    }
    return false;
}

excluir(jogo: Jogo): boolean{
  for(let i=0; i< this._jogos.length; i++){
    if(this._jogos[i].id == jogo.id){
      this._jogos.splice(i,1);
      return true;
    }
  }
  return false;
}

  get jogos(): Jogo[]{
    return this._jogos;
  }

  set jogos(jogos: Jogo[]){
    this._jogos = jogos;
  }
}
