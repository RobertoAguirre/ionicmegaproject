import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapjsPage } from './mapjs.page';

const routes: Routes = [
  {
    path: '',
    component: MapjsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapjsPageRoutingModule {}
