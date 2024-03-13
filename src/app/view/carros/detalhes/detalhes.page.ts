import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private alertController: AlertController
  ) { 
    this.user = this.auth.getUserLogged();
    this.formCadastrar = this.formBuilder.group({
      modelo: ['', Validators.required],
      marca:  ['', Validators.required],
      ano:  ['', [Validators.required, Validators.pattern(/^(19|20)?\d{2,4}$/), Validators.min(this.currentYear - 100), Validators.max(this.currentYear)]],
      price: ['', [Validators.pattern(/^(\d{1,3}(.\d{3})*(\.\d{1,2})?|\d+(\.\d{1,2})?)$/), Validators.min(0)]],
      carroceria:  ['', Validators.required],
    });
  }

  ngOnInit() {
    this.carros = history.state.carros;
    this.formCadastrar.patchValue({
      modelo: this.carros.modelo,
      marca: this.carros.marca,
      ano: this.carros.ano,
      price: this.carros.price,
      carroceria: this.carros.carroceria,
    });
  }
  
  habilitar() {
    this.edicao = !this.edicao;
    if (this.edicao) {
      this.formCadastrar.enable();
    } else {
      this.formCadastrar.disable();
    }
  }

  salvar() {
      this.carros.modelo = this.formCadastrar.value.modelo;
      this.carros.marca = this.formCadastrar.value.marca;
      this.carros.ano = this.formCadastrar.value.ano;
      this.carros.price = this.formCadastrar.value.price;
      this.carros.carroceria = this.formCadastrar.value.carroceria;

      this.firebase.update(this.carros, this.carros.id).then(() => {
        this.presentAlert("Salvo", "Carro Salvo!");
        this.router.navigate(['/home']);
      }).catch(error => {
        this.presentAlert("Erro", error.message);
      });
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
