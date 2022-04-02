import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevaPizzaPage } from './nueva-pizza.page';

const routes: Routes = [
  {
    path: '',
    component: NuevaPizzaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevaPizzaPageRoutingModule {}
