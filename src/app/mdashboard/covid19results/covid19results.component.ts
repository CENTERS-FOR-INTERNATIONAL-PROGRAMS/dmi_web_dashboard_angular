import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-covid19results',
  templateUrl: './covid19results.component.html',
  styleUrls: ['./covid19results.component.css']
})
export class Covid19resultsComponent {
  Highcharts: typeof Highcharts = Highcharts;
  overallpositivitychartOptions: Highcharts.Options = {
    title: {
        text: 'Overall COVID-19 Positivity',
    },
    colors: [
  "#FF0000",
  "green", 
],
    series: [
  {
    name: "Data",
            type: 'pie',
    data: [
      ["Posivite", 20],
      ["Negative", 30],
    ], // Replace with your data values
  },
],
    // series: [{
    //     data: [1, 2,],
    //     type: 'pie'
    // }],

    plotOptions: {
        pie: {
            innerSize: "70%", // Adjust the innerSize to control the size of the inner hole (donut hole)
            depth: 25, // Adjust the depth to control the thickness of the donut
            dataLabels: {
                enabled: true, // Disable data labels inside the donut segments
            },
        },
    }
};
ageCategories = [
    "0-4 yrs",
    "5-9 yrs",
    "15-34 yrs",
];


covid19resultsagainstenrollmentperfacilitychartOptions: Highcharts.Options = {

  chart: {
      type: 'column'
  },
  title: {
      text: 'COVID-19 Results Against Enrollment per Facility',
      align: 'left'
  },
  xAxis: {
      categories: ['Kenyatta National Hospital', 'Busia County Referral', 'Marsabit County ', 'Kapenguria County Referral']
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Number Enrolled'
      },
      stackLabels: {
          enabled: true
      }
  },
  legend: {
      align: 'left',
      x: 70,
      verticalAlign: 'top',
      y: 70,
      floating: true,
      // backgroundColor:
      //     Highcharts.defaultOptions.legend.backgroundColor || 'white',
      // borderColor: '#CCC',
      // borderWidth: 1,
      // shadow: false
  },
  tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
  },
  plotOptions: {
      column: {
          stacking: 'normal',
          dataLabels: {
              enabled: true
          }
      }
  },
  series: [{
      name: 'Positive',
      data: [3, 5, 1, 13],
      type:'column',
      color:'#FF0000'
  }, {
      name: 'Negative',
      data: [14, 8, 8, 12],
      type:'column',
      color:'#008000'
  }, ]
}










covid19positivitybygenderchartOptions: Highcharts.Options = {







};



covid19positivitybyageandgenderchartOptions: Highcharts.Options = {







}









}
