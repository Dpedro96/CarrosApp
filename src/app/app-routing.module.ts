import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./view/carros/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'detalhes',
    loadChildren: () => import('./view/carros/detalhes/detalhes.module').then( m => m.DetalhesPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./view/carros/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./view/usuario/signin/signin.module').then( m => m.SigninPageModule)
  },  {
    path: 'signup',
    loadChildren: () => import('./view/usuario/signup/signup.module').then( m => m.SignupPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
