import { ReviewService } from './../../services/review.service.ts.service';
import { CovidPositivity } from './../../models/covidPositivity.model';
import { NumEnrolled } from './../../models/numEnrolled.model';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  numberEnrolled: NumEnrolled[] = [];
  covidPositivity: CovidPositivity[] = [];
  positives: number = 0;
  negatives: number = 0;
  highcharts = Highcharts;
  overallpositivitychartOptions: {} = {};

  constructor(private reviewService: ReviewService,) {
    //this.loadOverallPositivity();
  }
  ngOnInit() {
    this.loadOverallPositivity();
    this.loadchat();
  }
  loadOverallPositivity() {
    this.reviewService.findCovidPositivity().subscribe(
      response => {
        this.covidPositivity = response;
        // tslint:disable-next-line:prefer-nfor-of
        // tslint:disable-next-line:prefer-for-of
        this.positives = this.covidPositivity[0].Covid19Positive;
        this.negatives = this.covidPositivity[0].Covid19Negative;
        console.log(this.positives);
        console.log(this.negatives);
        this.loadchat();
      });
  }
  loadchat() {
    this.overallpositivitychartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Overall COVID-19 Positivity',
      },
      series: [{

        data: [{
         name: 'Positives',
         y: this.positives

        }, {
         name: 'Negatives',
          y: this.negatives
        }
      ],

      }],
      plotOptions: {
        pie: {
          innerSize: "60%", // Adjust the innerSize to control the size of the inner hole (donut hole)
          depth: 25, // Adjust the depth to control the thickness of the donut
          dataLabels: {
            enabled: false, // Disable data labels inside the donut segments
          },
        },
      },
    };
    HC_exporting(Highcharts);
  }
  
  /*
    overallpositivitybyfacilitychartOptions: Highcharts.Options = {
      title: {
        text: 'Overall Positivity By Facility',
      },
      // Data retrieved from https://gs.statcounter.com/browser-market-share#monthly-202201-202201-bar

      // Create the chart
      // const ColumnChart1 = () => {
      // const options = {
      chart: {
        type: "column",
      },
      // title: {
      // 	text: "Enrollment Cascade",
      // },
      xAxis: {
        categories: ["Kenyatta National Hospital", "Busia County Referral", "Marsabit County ", "JOOTRH", "Makueni"], // Replace with your categories
      },
      yAxis: {
        title: {
          text: "Number Positive",
        },
      },

      series: [
        {
          name: "Health Facilities",
          data: [60, 55, 20, 20, 15],
          type: 'column',
          color: "#234FEA",
        },
      ],
    };

    positivitybysexandagechartOptions: Highcharts.Options = {
      chart: {
        //zoomType: 'xy'
      },
      title: {
        text: 'Covid-19 Positivity over Time',
        align: 'left'
      },

      xAxis: [{
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        crosshair: true
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value}',

        },
        title: {
          text: 'Number Tested',

        }
      }, { // Secondary yAxis
        title: {
          text: 'Tested Positive',
          // style: {
          //     color: Highcharts.getOptions().colors[0]
          // }
        },
        labels: {
          format: '{value}%',
          // style: {
          //     color: Highcharts.getOptions().colors[0]
          // }
        },
        opposite: true
      }],
      tooltip: {
        shared: true
      },
      legend: {
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 60,
        floating: true,
        // backgroundColor:
        //     Highcharts.defaultOptions.legend.backgroundColor || // theme
        //     'rgba(255,255,255,0.25)'
      },
      series: [{
        name: 'Sample Tested',
        type: 'column',
        yAxis: 1,
        data: [27.6, 28.8, 21.7, 34.1, 29.0, 28.4, 45.6, 51.7, 39.0,
          60.0, 28.6, 32.1],
        tooltip: {
          valueSuffix: ' mm'
        }

      }, {
        name: '% Positivity',
        type: 'spline',
        data: [-13.6, -14.9, -5.8, -0.7, 3.1, 13.0, 14.5, 10.8, 5.8,
        -0.7, -11.0, -16.4],
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        accessibility: { point: { valueSuffix: '%' } },
        // valueSuffix: '°C'
        // tooltip: {
        //     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        // },
        // accessibility: { point: { valueSuffix: '%' } },

      }]
    };

    covid19positivitybygenderchartOptions: Highcharts.Options = {

      title: {
        text: 'Covid 19 Positivity by Gender',
        align: 'left'
      },
      series: [{
        data: [1, 2, 3],
        type: 'pie'
      }],


      // chart: {
      //     type: 'bar'
      // },
      // title: {
      //     text: 'Number enrolled and tested COVID-19 positive',
      //     align: 'left'
      // },

      // // subtitle: {
      // //     text: 'Source: <a ' +
      // //         'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
      // //         'target="_blank">Wikipedia.org</a>',
      // //     align: 'left'
      // // },

      // xAxis: {
      //     categories: ['Busia CRH', 'Nakuru Level 6', 'Kapenguria', 'Loitoktok'],
      //     title: {
      //         text: null
      //     },
      //     gridLineWidth: 1,
      //     lineWidth: 0
      // },
      // yAxis: {
      //     min: 0,
      //     title: {
      //         text: 'Cases',
      //         align: 'high'
      //     },
      //     labels: {
      //         overflow: 'justify'
      //     },
      //     gridLineWidth: 0
      // },
      // // tooltip: {
      // //     valueSuffix: ' millions'
      // // },
      // plotOptions: {
      //     bar: {
      //         borderRadius: '50%',
      //         dataLabels: {
      //             enabled: true
      //         },
      //         groupPadding: 0.1
      //     }
      // },
      // legend: {
      //     layout: 'vertical',
      //     align: 'right',
      //     verticalAlign: 'top',
      //     x: -40,
      //     y: 80,
      //     floating: true,
      //     borderWidth: 1,
      //     backgroundColor:
      //         '#FFFFFF',
      //     shadow: true
      // },
      // credits: {
      //     enabled: false
      // },
      // series: [{
      //     name: 'Total Enrolled',
      //     data: [631, 727, 3202, 721],
      //     type: 'bar'
      // }, {
      //     name: 'Covid-19 Positive',
      //     data: [814, 841, 3714, 726],
      //     type: 'bar'
      // }]
    }; */
}

