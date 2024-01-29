import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  carros : Carros
  edicao: boolean = true
  public imagem: any;
  public user : any;
  formCadastrar : FormGroup;
  currentYear = new Date().getFullYear();
  constructor(private formBuilder:FormBuilder, private firebase: FirebaseService, private router: Router,private auth: AuthService, private alert: AlertService, private alertController: AlertController) { 
    this.user = this.auth.getUserLogged();
    this.formCadastrar = new FormGroup({
      modelo: new FormControl(''),
      marca: new FormControl(''),
      ano: new FormControl(''),
      price: new FormControl(''),
      carroceria: new FormControl('')
    });
  }

  ngOnInit() {
    this.carros = history.state.carros;
    this.formCadastrar = this.formBuilder.group({
      modelo: [this.carros.modelo, [Validators.required]],
      marca:  [this.carros.marca, [Validators.required]],
      ano:  [this.carros.ano, [Validators.required, Validators.pattern(/^(19|20)?\d{2,4}$/), Validators.min(this.currentYear - 100), Validators.max(this.currentYear)]],
      price: [this.carros.price, [Validators.pattern(/^(\d{1,3}(.\d{3})*(\.\d{1,2})?|\d+(\.\d{1,2})?)$/), Validators.min(0)]],
      carroceria:  [this.carros.carroceria, [Validators.required]],
    })
  }
  
  habilitar(){
    if(this.edicao){
      this.edicao = false
    }else{
      this.edicao = true;
    }
  }

    salvar(){
    this.alert.simpleLoader();
    setTimeout(() => {
    this.alert.dismissLoader();
      if(this.formCadastrar.valid){
          let novo: Carros = new Carros(this.formCadastrar.value['modelo'],this.formCadastrar.value['marca'], this.formCadastrar.value['ano'], this.formCadastrar.value['price'], this.formCadastrar.value['carroceria']);
          novo.id = this.carros.id;
          novo.uid = this.user.uid;
          if(this.imagem){
            this.firebase.uploadImage(this.imagem, novo);
          }
          else{
            this.firebase.update(novo, this.carros.id);
          }
          this.alert.presentAlert("Salvo", "Carro Salvo!");
          this.router.navigate(['/home']);
        }
        else{
          this.alert.presentAlert("Erro", "Campos Obrigatórios");
        }
      }, 1000);
    }

    excluir(){
      this.firebase.delete(this.carros);
      this.router.navigate(['/home'])
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
