import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  formLogar: FormGroup;
  constructor(private authService: AuthService,private route: Router, private formBuilder: FormBuilder, private alert: AlertService) {
    this.formLogar = new FormGroup({
      email : new FormControl(''),
      senha : new FormControl('')
    });
   }

  ngOnInit() {
    this.formLogar = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],//required quando é obrigatorio o campo
      senha:['',[Validators.required, Validators.minLength(6)]]
    }) 
  }

  get errorControl(){
    return this.formLogar.controls;
  }

  submitForm(): boolean{
    if(!this.formLogar.valid){
      this.alert.presentAlert("Erro", "Erro email ou senha")
      return false;
    }
    else{
      this.logar();
      return true;
    }
  }

  private logar() {
    this.authService.signIn(this.formLogar.value['email'],
    this.formLogar.value['senha']).then((res)=>{
      this.alert.presentAlert("Olá", "Seja bem vindo");
      this.route.navigate(["home"]);
    } ).catch((error)=>{
      this.alert.presentAlert('Logar', 'Erro ao logar');
      console.log(error);
    })
  }

  logarComGoogle(): void{
    this.authService.signWithGoogle().then((res)=>{
      this.alert.presentAlert("Olá", "Seja bem vindo");
      this.route.navigate(["home"]);
    } ).catch((error)=>{
      this.alert.presentAlert('Logar', 'Erro ao logar');
      console.log(error);
    })
  }

  irParaSignUp(){
    this.route.navigate(["signup"]);
  }
}
