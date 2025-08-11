import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
      },
      { path: 'o-nas', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
      { path: 'produkty', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent) },
      { path: 'realizacie', loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent) },
      { path: 'cenovy-dopyt', loadComponent: () => import('./pages/pricing/pricing.component').then(m => m.PricingComponent) },
      { path: 'clanky', loadComponent: () => import('./pages/articles/articles.component').then(m => m.ArticlesComponent) },
      { path: 'kontakt', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) }
    ]
  }
];
