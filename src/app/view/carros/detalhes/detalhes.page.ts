import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/common/alert.service';

import Carros from 'src/app/model/entities/Carros';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  carros: Carros;
  edicao: boolean = false;
  public imagem: any;
  public user: any;
  formCadastrar: FormGroup;
  currentYear = new Date().getFullYear();
  
  constructor(
    private formBuilder: FormBuilder, 
    private firebase: FirebaseService, 
    private router: Router,
    private auth: AuthService, 
    private alertController: AlertController,
    private alert: AlertService
    
  ) { 
    this.user = this.auth.getUserLogged();

  }

  ngOnInit() {
    this.carros = history.state.carros;
  }
  
  habilitar() {
    this.edicao = !this.edicao;
    if (this.edicao) {
      this.formCadastrar.enable();
    } else {
      this.formCadastrar.disable();
    }
  }

  salvar(formCadastra: FormGroup) {
    this.alert.simpleLoader();
    setTimeout(() => {
      this.alert.dismissLoader();
    if(formCadastra.valid){
      this.carros.modelo = formCadastra.value.modelo;
      this.carros.marca = formCadastra.value.marca;
      this.carros.ano = formCadastra.value.ano;
      this.carros.price = formCadastra.value.price;
      this.carros.carroceria = formCadastra.value.carroceria;

      this.firebase.update(this.carros, this.carros.id).then(() => {
        this.presentAlert("Salvo", "Carro Salvo!");
        this.router.navigate(['/home']);
      }).catch(error => {
        this.presentAlert("Erro", error.message);
      });
    }
      else{
        this.alert.presentAlert("Erro", "Campos Obrigatórios");
      }
    }, 1000);
  }

  excluir() {
    this.firebase.delete(this.carros).then(() => {
      this.router.navigate(['/home']);
    }).catch(error => {
      this.presentAlert("Erro", error.message);
    });
  }

  async showConfirm() {
    const confirm = await this.alertController.create({
        message: 'Você tem certeza?',
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
                  this.excluir();
               }
           }
       ]
    });
    await confirm.present();
  }
  
  uploadFile(imagem: any) {
    this.imagem = imagem.files;
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  onCarrosChange(newCarros: Carros) {
    console.log(newCarros)
    this.carros = newCarros;
  }
}
