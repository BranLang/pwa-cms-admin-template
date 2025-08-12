import { Routes } from '@angular/router';
import { homeResolver, menuResolver, settingsResolver } from './resolvers';

export const routes: Routes = [
  {
    path: '',
    resolve: {
      settings: settingsResolver,
      menu: menuResolver,
      home: homeResolver,
    },
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
      }
    ]
  }
];
