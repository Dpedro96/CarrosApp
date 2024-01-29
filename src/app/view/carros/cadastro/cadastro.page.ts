import { Component, OnInit } from '@angular/core';
import Carros from 'src/app/model/entities/Carros';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/model/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/common/alert.service';
import { BrMaskModel } from 'br-mask';
 
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
  currentYear = new Date().getFullYear();
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
      ano:  ['', [Validators.required, Validators.pattern(/^(19|20)?\d{2,4}$/), Validators.min(this.currentYear - 100), Validators.max(this.currentYear)]],
      price: ['', [Validators.pattern(/^(\d{1,3}(.\d{3})*(\.\d{1,2})?|\d+(\.\d{1,2})?)$/), Validators.min(0)]],
      carroceria:  ['', [Validators.required]],
    })
  }

  
cadastrar(){
    this.alert.simpleLoader();
    setTimeout(() => {
      this.alert.dismissLoader();
    if(this.formCadastrar.valid){
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
