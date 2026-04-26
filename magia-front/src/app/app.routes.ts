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
      {
        path: 'perfil',
        loadComponent: () => import('./components/perfil/perfil.page').then( m => m.PerfilPage)
      },
      {
        path: '',
        redirectTo: 'estudo-ia',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'multipla-escolha',
    loadComponent: () => import('./components/multipla-escolha/multipla-escolha.page').then( m => m.MultiplaEscolhaPage)
  },
  {
    path: 'complete',
    loadComponent: () => import('./components/complete/complete.page').then( m => m.CompletePage)
  },
  {
    path: 'create-account',
    loadComponent: () => import('./components/create-account/create-account.page').then( m => m.CreateAccountPage)
  },
  {
    path: 'config-ia',
    loadComponent: () => import('./components/config-ia/config-ia.page').then( m => m.ConfigIaPage)
  },
  {
    path: 'flashcards',
    loadComponent: () => import('./components/flashcards/flashcards.page').then( m => m.FlashcardsPage)
  },
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found.page').then( m => m.NotFoundPage)
  },

];
