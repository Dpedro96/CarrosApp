import { Component } from '@angular/core';
import Carros from 'src/app/model/entities/Carros';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listaCarros : Carros[] = [];
  isLoading: boolean = false;
  public user:any;
  model: any = {
    icon: 'car-sport-outline',
    title: 'nenhum carro cadastrado',
  };

  constructor(private authService: AuthService, private firebase: FirebaseService, private router: Router) {
    this.user = this.authService.getUserLogged()
    console.log(this.user);
    this.isLoading = true;
    setTimeout(()=>{
    this.firebase.read(this.user.uid).subscribe(res => { this.listaCarros = res.map(carros =>{
      return{
        id : carros.payload.doc.id,
        ... carros.payload.doc.data() as any
      } as Carros
    })})
    this.isLoading = false;
  },2000);
  }

  irParaCadastrar(){
    this.router.navigate(["/cadastro"])
  }

  detalhar(carros: Carros){
    this.router.navigateByUrl("/detalhes", {state: {carros:carros}});
  }

  logout(){
    this.authService.signOut().then((res)=>{
      this.router.navigate(['signin']);
    })
  }
}
