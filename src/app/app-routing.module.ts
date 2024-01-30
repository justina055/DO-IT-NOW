import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list-reorder',
    loadChildren: () =>
      import('./pages/list-reorder/list-reorder.module').then(
        (m) => m.ListReorderPageModule
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'agregar-editar-tarea-modal',
    loadChildren: () =>
      import(
        './pages/agregar-editar-tarea-modal/agregar-editar-tarea-modal.module'
      ).then((m) => m.AgregarEditarTareaModalPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
