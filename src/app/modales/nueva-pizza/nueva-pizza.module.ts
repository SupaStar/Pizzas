import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaPizzaPageRoutingModule } from './nueva-pizza-routing.module';

import { NuevaPizzaPage } from './nueva-pizza.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaPizzaPageRoutingModule
  ],
  declarations: [NuevaPizzaPage]
})
export class NuevaPizzaPageModule {}
