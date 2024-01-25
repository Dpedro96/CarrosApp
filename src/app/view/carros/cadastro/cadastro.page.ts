import { Component, OnInit } from '@angular/core';
import Carros from 'src/app/model/entities/Carros';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/model/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/common/alert.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  carros: Carros;
  public user : any;
  public imagem: any;
  formCadastrar : FormGroup;
  constructor(private formBuilder:FormBuilder, private alert: AlertService, private router: Router, private firebase: FirebaseService,private auth: AuthService){
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
    this.formCadastrar = this.formBuilder.group({
      modelo: ['', [Validators.required]],
      marca:  ['', [Validators.required]],
      ano:  ['', [Validators.required]],
      price:  [''],
      carroceria:  ['', [Validators.required]],
    })
  }
cadastrar(){
    this.alert.simpleLoader();
    setTimeout(() => {
      this.alert.dismissLoader();
    if(this.formCadastrar.value['modelo'] && this.formCadastrar.value['marca'] && this.formCadastrar.value['ano'] && this.formCadastrar.value['carroceria']){
      let novo: Carros = new Carros(this.formCadastrar.value['modelo'],this.formCadastrar.value['marca'], this.formCadastrar.value['ano'], this.formCadastrar.value['price'], this.formCadastrar.value['carroceria']);
      novo.uid = this.user.uid;
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, novo);
      }
      else{
        this.firebase.create(novo);  
      }
      this.alert.presentAlert("Salvo", "Carro Salvo!");
      this.router.navigate(['/home']);
    }
    else{
      this.alert.presentAlert("Erro", "Campos Obrigatórios");
    }
  }, 1000);
}

  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }
}
