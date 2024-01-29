export default class Carros{

    private _id :string;
    private _modelo: string
    private _marca: string
    private _ano: number
    private _price: string
    private _carroceria: string
    private _downloadURL: any;
    private _uid : string;

    constructor(modelo: string, marca: string, ano: number, price: string,  carroceria: string){
        this._modelo = modelo;
        this._marca = marca;
        this._ano = ano;
        this._price = price;
        this._carroceria = carroceria;
    }
    public get uid(): string {
        return this._uid;
      }
      public set uid(value: string) {
        this._uid = value;
      }
    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }
    public get modelo(): string {
        return this._modelo
    }
    public set modelo(value: string) {
        this._modelo = value
    }
    public get marca(): string {
        return this._marca
    }
    public set marca(value: string) {
        this._marca = value
    }
    public get ano(): number {
        return this._ano
    }
    public set ano(value: number) {
        this._ano = value
    }
    public get price(): string {
        return this._price
    }
    public set price(value: string) {
        this._price = value
    }
    public get carroceria(): string {
        return this._carroceria
    }
    public set carroceria(value: string) {
        this._carroceria = value
    }
    public get downloadURL(): any {
        return this._downloadURL;
      }
    public set downloadURL(downloadURL: any) {
        this._downloadURL = downloadURL;
    }

}