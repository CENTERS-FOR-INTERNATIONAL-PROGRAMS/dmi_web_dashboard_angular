import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdashboardComponent } from './mdashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { ScreenedComponent } from './screened/screened.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { EnrolledComponent } from './enrolled/enrolled.component';
import { Covid19resultsComponent } from './covid19results/covid19results.component';
import { HttpClientModule } from '@angular/common/http'; // Use HTTP import
import { RouterModule, Routes } from '@angular/router';
import * as HighchartsMore from 'highcharts/highcharts-more.src';
import * as HighchartsSolidGauge from 'highcharts/modules/solid-gauge'; 
import * as Highcharts from 'highcharts';




const appRoute: Routes = [
  {path:'', component:OverviewComponent},
  {path:'Covid 19 Results', component:Covid19resultsComponent},
  {path:'Enrollment', component:EnrolledComponent},
  {path:'Screening', component:ScreenedComponent},
]

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
    RouterModule.forRoot(appRoute),
    HttpClientModule, // Add HttpClientModule here,
  ],
  exports: [
    MdashboardComponent
  ]
})
export class MdashboardModule { }
