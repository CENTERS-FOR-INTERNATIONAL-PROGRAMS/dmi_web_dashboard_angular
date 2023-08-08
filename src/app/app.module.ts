import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { MdashboardModule } from './mdashboard/mdashboard.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import HighchartsMore from 'highcharts/highcharts-more.src';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge'
import * as Highcharts from 'highcharts';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    HighchartsChartModule,
    MdashboardModule,
    // HighchartsMore(Highcharts),
    // HighchartsSolidGauge(Highcharts),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
