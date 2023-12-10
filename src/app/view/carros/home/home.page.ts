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
  listaCarros : Carros[] = []

  constructor(private authService: AuthService, private firebase: FirebaseService, private router: Router) {
    console.log(this.authService.getUserLogged());
    this.firebase.read().subscribe(res => { this.listaCarros = res.map(carros =>{
      return{
        id : carros.payload.doc.id,
        ... carros.payload.doc.data() as any
      } as Carros
    })})
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
