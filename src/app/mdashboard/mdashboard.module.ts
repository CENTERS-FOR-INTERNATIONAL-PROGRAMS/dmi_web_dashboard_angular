import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdashboardComponent } from './mdashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { ScreenedComponent } from './screened/screened.component';
import { HighchartsChartModule } from 'highcharts-angular';



@NgModule({
  declarations: [
    MdashboardComponent,
    OverviewComponent,
    ScreenedComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule
  ],
  exports: [
    MdashboardComponent
  ]
})
export class MdashboardModule { }
