import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdashboardComponent } from './mdashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { ScreenedComponent } from './screened/screened.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { EnrolledComponent } from './enrolled/enrolled.component';
import { Covid19resultsComponent } from './covid19results/covid19results.component';
import { HttpClientModule } from '@angular/common/http'; // Use HTTP import

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
    HighchartsChartModule,
    HttpClientModule // Add HttpClientModule here
  ],
  exports: [
    MdashboardComponent
  ]
})
export class MdashboardModule { }
