import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellDataComponent } from './components/cell-data/cell-data.component';

import { TwaiceTaskRoutingModule } from './twaice-task-routing.module';
import { LineChartComponent } from './components/line-chart/line-chart.component';







@NgModule({
  declarations: [CellDataComponent, LineChartComponent],
  imports: [
    CommonModule,
    TwaiceTaskRoutingModule
    
    
  ],
  exports: [
    CellDataComponent
  ]
})
export class TwaiceTaskModule { }
