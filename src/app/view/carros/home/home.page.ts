import { Component, ViewChild } from '@angular/core';
import Carros from 'src/app/model/entities/Carros';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { AuthService } from 'src/app/model/services/auth.service';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listaCarros: Carros[] = [];
  carros: Carros[] = []; // Adicionado
  isLoading: boolean = false;
  hasSearched: boolean = false; // Adicionado
  query: string = ''; // Adicionado
  @ViewChild('mySearchbar', { static: false }) searchbar: IonSearchbar; 
  public user:any;
  emptySearchModel: any = {
    icon: 'search-outline',
    title: 'Nenhum carro encontrado.'
  };
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
  
  async onSearchChange(event: any) {
    this.hasSearched = true;
    this.query = event.detail.value.toLowerCase();
    this.carros = [];
    if (this.query.length > 0) {
       this.isLoading = true;
       setTimeout(() => {
         // Ajuste aqui para buscar pelo campo correto do modelo do carro
         this.carros = this.listaCarros.filter((carro: any) => {
           // Verifique se o modelo do carro inclui a query, considerando maiúsculas e minúsculas
           return carro.modelo.toLowerCase().includes(this.query);
         });
         console.log(this.carros);
         this.isLoading = false;
       }, 3000); // Ajuste o tempo de atraso conforme necessário
    }
   }
   
   
   returnSearch() {
    this.hasSearched = false;
    this.searchbar.value = null;
   }
   
   
   
}
