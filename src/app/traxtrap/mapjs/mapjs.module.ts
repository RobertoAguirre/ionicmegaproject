import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapjsPageRoutingModule } from './mapjs-routing.module';

import { MapjsPage } from './mapjs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapjsPageRoutingModule
  ],
  declarations: [MapjsPage]
})
export class MapjsPageModule {}
