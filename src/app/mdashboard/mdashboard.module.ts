import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdashboardComponent } from './mdashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { ScreenedComponent } from './screened/screened.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { EnrolledComponent } from './enrolled/enrolled.component';
import { Covid19resultsComponent } from './covid19results/covid19results.component';



@NgModule({
  declarations: [
    MdashboardComponent,
    OverviewComponent,
    ScreenedComponent,
    EnrolledComponent,
    Covid19resultsComponent
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
