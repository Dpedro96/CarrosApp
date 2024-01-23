import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import Carros from 'src/app/model/entities/Carros';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';



@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  carros : Carros
  indice : number
  modelo: string
  marca: string
  ano: number
  price: number
  carroceria: string
  edicao: boolean = true
  public imagem: any;
  public user : any;
  constructor(private firebase: FirebaseService, private router: Router,private auth: AuthService, private alertController: AlertController) { 
    this.user = this.auth.getUserLogged();
  }

  ngOnInit() {
    this.carros = history.state.carros;
    this.modelo = this.carros.modelo;
    this.marca = this.carros.marca;
    this.ano = this.carros.ano;
    this.price = this.carros.price;
    this.carroceria = this.carros.carroceria;
  }
  habilitar(){
    if(this.edicao){
      this.edicao = false
    }else{
      this.edicao = true;
    }
  }
    salvar(){
      if(this.modelo && this.marca && this.ano){
        let novo: Carros = new Carros(this.modelo,this.marca, this.ano, this.price, this.carroceria);
        novo.id = this.carros.id;
        novo.uid = this.user.uid;
        if(this.imagem){
          this.firebase.uploadImage(this.imagem, novo);
        }
        else{
          this.firebase.update(novo, this.carros.id);
        }
        this.presentAlert("Salvo", "Carro Salvo!");
        this.router.navigate(['/home']);
      }
      else{
        this.presentAlert("Erro", "Campos Obrigatórios!");
      }
    }

    excluir(){
      this.firebase.delete(this.carros);
      this.router.navigate(['/home'])
    }

    async presentAlert(subHeader: string, message: string){
      const alert = await this.alertController.create({
        header: 'Garage',
        subHeader: subHeader,
        message: message,
        buttons: ['OK'],
      });
  
      await alert.present();
    }
    async showConfirm() {
      const confirm = this.alertController.create({
          message: 'Você tem certeza',
          buttons: [
              {
                  text: 'Cancelar',
                  handler: () => {
                      console.log('Disagree clicked');
                  }
              },
              {
                 text: 'OK',
                 handler: () => {
                    this.excluir()
                 }
             }
         ]
    });
     (await confirm).present();
  }
  
  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }
}
