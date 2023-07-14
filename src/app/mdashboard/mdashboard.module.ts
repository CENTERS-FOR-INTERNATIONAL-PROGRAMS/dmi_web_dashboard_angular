import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdashboardComponent } from './mdashboard.component';
import { OverviewComponent } from './overview/overview.component';



@NgModule({
  declarations: [
    MdashboardComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MdashboardModule { }
