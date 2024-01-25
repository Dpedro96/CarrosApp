import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController,private loading: LoadingController) { }
  
  async presentAlert(subHeader : string, message : string) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  simpleLoader(){
    this.loading.create({
      message: 'Carregando'
    }).then((response) => {
      response.present();
    })
  }

  dismissLoader(){
    this.loading.dismiss().then((response)=>{
      console.log('Loader Fechado', response);
    })
  }
}
