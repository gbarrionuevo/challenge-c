import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'listing',
    loadComponent: () => import('./feature-dashboard/listing/listing.component').then(mod => mod.ListingComponent)
  },
  {
    path: 'show/:id',
    loadComponent: () => import('./feature-dashboard/show-detail/show-detail.component').then(mod => mod.ShowDetailComponent)
  },
  {
    path: '',
    redirectTo: 'listing',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
