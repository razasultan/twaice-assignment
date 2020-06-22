import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CellDataComponent } from './components/cell-data/cell-data.component';

const routes: Routes = [
  {
    path: '',
    component: CellDataComponent,
    data: {
      title: 'Assignment'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TwaiceTaskRoutingModule {}
