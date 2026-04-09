import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then( m => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./components/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'curiosidades',
        loadComponent: () => import('./components/curiosidades/curiosidades.page').then( m => m.CuriosidadesPage)
      },
      {
        path: 'curiosidade-detalhe/:id',
        loadComponent: () => import('./components/curiosidade-detalhe/curiosidade-detalhe.page').then( m => m.CuriosidadeDetalhePage)
      },
      {
        path: 'estudo-ia',
        loadComponent: () => import('./components/estudo-ia/estudo-ia.page').then( m => m.EstudoIAPage)
      },
    ]
  },



];
