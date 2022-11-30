export class Jogo {
    private _id: any;
    private _nome: string;
    private _preco: number;
    private _plataforma: string;
    private _data_lancamento: string;
    private _dev: string;
    private _genero: string;
    private _estilo: string;
    private _downloadURL : string;
    private _user_id: string;

    constructor(nome: string, preco: number, genero: string, dev: string, plataforma: string, estilo: string, data_lancamento: string){
        let chave = new Date;
        this._id = chave.getTime();
        this._nome = nome;
        this._genero = genero;
        this._preco = preco;
        this._dev = dev;
        this._plataforma = plataforma;
        this._estilo = estilo;
        this._data_lancamento = data_lancamento;
    }

    get id(): any{
        return this._id;
    }

    get nome(): string{
        return this._nome;
    }

    get genero(): string{
        return this._genero
    }

    get preco(): number{
        return this._preco;
    }
    get dev(): string{
        return this._dev
    }

    get plataforma(): string{
        return this._plataforma;
    }

    get estilo(): string{
        return this._estilo
    }

    get data_lancamento(): string{
        return this._data_lancamento;
    }

    set nome(nome: string){
        this._nome = nome;
    }
    
    set genero(genero: string){
        this._genero = genero;
    }

    set preco(preco: number){
        this._preco = preco;
    }
    set dev(dev: string){
        this._dev = dev;
    }

    set plataforma(plataforma: string){
        this._plataforma = plataforma;
    }

    set estilo(estilo: string){
        this._estilo = estilo;
    }

    set data_lancamento(data_lancamento: string){
        this._data_lancamento = data_lancamento;
    }
    get downloadURL() : string{
        return this._downloadURL;
       }
    
       set downloadURL(downloadURL : string){
        this._downloadURL = downloadURL;
       }
    get user_id() : string{
        return this._user_id;
    }
    set user_id(user_id: string){
        this._user_id = user_id;
    }
}
