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
      this.alert.simpleLoader();
      this.logar();
      return true;
    }
  }

  private logar() {
    this.authService.signIn(this.formLogar.value['email'],
    this.formLogar.value['senha']).then((res)=>{
      this.alert.dismissLoader();
      this.alert.presentAlert("Olá", "Seja bem vindo");
      this.route.navigate(["home"]);
    } ).catch((error)=>{
      this.alert.dismissLoader();
      this.alert.presentAlert('Logar', 'Erro ao logar');
      console.log(error);
    })
  }

  public logarComGoogle(): void{
    this.authService.signInWithGoogle().then((res)=>{
      setTimeout(() => {
        this.alert.presentAlert("Olá", "Seja bem vindo");
        this.route.navigate(["home"]);
      }, 1000);
    } ).catch((error)=>{
      this.alert.presentAlert('Logar', 'Erro ao logar');
      console.log(error);
    })
  }

  public logarComGithub(): void{
    this.authService.signInWithGithub().then((res)=>{
      setTimeout(() => {
        this.alert.presentAlert("Olá", "Seja bem vindo");
        this.route.navigate(["home"]);
      }, 1000);
    } ).catch((error)=>{
      if (error.code === 'auth/accont-exists-with-diferrent-credential'){
        this.alert.presentAlert('Logar', 'Esse email já está com outro acesso')
      }else{
      this.alert.presentAlert('Logar', 'Erro ao logar');
      console.log(error);
    }
    })
  }

  irParaSignUp(){
    this.route.navigate(["signup"]);
  }
}
