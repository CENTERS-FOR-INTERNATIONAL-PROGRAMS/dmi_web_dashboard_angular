import { ReviewService } from './../../services/review.service.ts.service';
import { CovidPositivity } from './../../models/covidPositivity.model';
import { Covid19PositivityByGender } from './../../models/covid19PositivityByGender.model';
import { Covid19OverallPositivityByFacility } from './../../models/covid19OverallPositivityByFacility.model';
import { NumEnrolled } from './../../models/numEnrolled.model';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit{

  numberEnrolled: NumEnrolled[] = [];
  //Positivity --
  covidPositivity: CovidPositivity[] = [];
  positives: number = 0;
  negatives: number = 0;
  //---
  
  // Positivity By Gender----
  covid19PositivityByGender: Covid19PositivityByGender[]= [];
  covid19PositivityByGenderSeries: any[] = [];
  Gender: number = 0;
  // ---

   // Overall Positivity By Facility----
   covid19OverallPositivityByFacility: Covid19OverallPositivityByFacility[]= [];
   covid19OverallPositivityByFacilitySeries: any[][] = [];
   Facility: number = 0;
   // ---

  PositiveNumber: number = 0;
  highcharts = Highcharts;
  highcharts1 = Highcharts;
  highcharts2 = Highcharts;
  highcharts3 = Highcharts;
  overallpositivitychartOptions: {} = {};
  overallpositivitybygenderchartOptions: {} = {};
  overallpositivitybyfacilitychartOptions: {} = {};

  constructor(private reviewService: ReviewService,) {
    //this.loadOverallPositivity();
  }
  ngOnInit() {
    this.loadCovidPositivityData();
    this.loadCovidPositivitychat();

    this.loadCovid19PositivityByGenderData();
    this.loadCovid19PositivityByGenderchart();

    this.loadCovid19OverallPositivityByFacilityData();
    this.loadCovid19OverallPositivityByFacilityChart();
  }
  loadCovidPositivityData() {
    this.reviewService.findCovidPositivity().subscribe(
      response => {
        this.covidPositivity = response;
        this.positives = this.covidPositivity[0].Covid19Positive;
        this.negatives = this.covidPositivity[0].Covid19Negative;
        this.loadCovidPositivitychat();
      });
  }

  loadCovidPositivitychat() {
    this.overallpositivitychartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Overall COVID-19 Positivity',
      },
      colors: [
        "#FF0000",
        "green",
      ],
      series: [{

        name: "Data",

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
            enabled: true, // Disable data labels inside the donut segments
          },
        },
      },
    };
    HC_exporting(Highcharts);
  }

  loadCovid19PositivityByGenderData() {
    this.reviewService.findCovid19PositivityByGender().subscribe(
      response => {
        this.covid19PositivityByGender = response;
        
        this.covid19PositivityByGender.forEach(dataInstance => {
            if(dataInstance.Gender == "Male") {
                this.covid19PositivityByGenderSeries.push(dataInstance.PositiveNumber);    
            }
            
            if(dataInstance.Gender == "Female") {
                this.covid19PositivityByGenderSeries.push(dataInstance.PositiveNumber);    
            }
        });

        

        // this.PositiveNumber = this.covid19PositivityByGender[0].PositiveNumber;
        // this.Gender = this.covid19PositivityByGender[0].Gender;
        this.loadCovid19PositivityByGenderchart();
      });
  }
  loadCovid19PositivityByGenderchart() {
    this.overallpositivitybygenderchartOptions = {

        title: {
            text: 'Covid 19 Positivity by Gender',
            align: 'left'
        },

        chart: {
            type: "pie",
        },

        colors: [
            "#234FEA", // Color for Category 2
            "#FC7500", // Color for Category 3
        ],
        series: [
            {
                name: "Data",
                type: 'pie',
                data: [
                    ["Male", this.covid19PositivityByGenderSeries[0]],
                    ["Female", this.covid19PositivityByGenderSeries[1]],
                ], // Replace with your data values
            },
        ],
    };
    HC_exporting(Highcharts);
  }

  //---
  loadCovid19OverallPositivityByFacilityData() {
    this.reviewService.findCovid19OverallPositivityByFacility().subscribe(
      response => {
        this.covid19OverallPositivityByFacility = response;

        // Health Facilities (index --> 0)
        this.covid19OverallPositivityByFacilitySeries.push([]);
        // Positive Numbers (index --> 1)
        this.covid19OverallPositivityByFacilitySeries.push([]);

        this.covid19OverallPositivityByFacility.forEach(dataInstance => {
            this.covid19OverallPositivityByFacilitySeries[0].push(dataInstance.Facility);
            this.covid19OverallPositivityByFacilitySeries[1].push(dataInstance.PositiveNumber); 
        });
      });
  }
  loadCovid19OverallPositivityByFacilityChart() {
    this.overallpositivitybyfacilitychartOptions = {
        title: {
            text: 'Overall Positivity By Facility',
            align: 'left'
        },
        chart: {
            type: "column",
        },
        // title: {
        //  text: "Enrollment Cascade",
        // },
        xAxis: {
            categories: this.covid19OverallPositivityByFacilitySeries[0], // Replace with your categories
        },
        yAxis: {
            title: {
                text: "Number Positive",
            },
        },

        series: [
            {
                name: "Health Facilities",
                data: this.covid19OverallPositivityByFacilitySeries[1],
                type: 'column',
                color: "#234FEA",
            },
        ],
    };
    HC_exporting(Highcharts);
  }

  //---

    /*ageCategories = [
        "0-4 yrs",
        "5-9 yrs",
        "15-34 yrs",
    ];*/
    /*overallpositivitybyfacilitychartOptions: Highcharts.Options = {
        title: {
            text: 'Overall Positivity By Facility',
            align: 'left'
        },
        chart: {
            type: "column",
        },
        // title: {
        //  text: "Enrollment Cascade",
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
    };*/
    positivitybysexandagechartOptions: Highcharts.Options = {
        chart: {
            //zoomType: 'xy'
        },
        title: {
            text: 'Covid-19 Positivity over Time',
            align: 'left'
        },
        // subtitle: {
        //     text: 'Source: ' +
        //         '<a href="https://www.yr.no/nb/historikk/graf/5-97251/Norge/Troms%20og%20Finnmark/Karasjok/Karasjok?q=2021"' +
        //         'target="_blank">YR</a>',
        //     align: 'left'
        // },
        xAxis: [{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                // style: {
                //     color: Highcharts.getOptions().colors[1]
                // }
            },
            title: {
                text: 'Number Tested',
                // style: {
                //     color: Highcharts.getOptions().colors[1]
                // }
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
            color: '#234FEA',
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
            color: 'red',
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
    /*covid19positivitybygenderchartOptions: Highcharts.Options = {

        title: {
            text: 'Covid 19 Positivity by Gender',
            align: 'left'
        },

        chart: {
            type: "pie",
        },

        colors: [
            "#234FEA", // Color for Category 2
            "#FC7500", // Color for Category 3
        ],
        series: [
            {
                name: "Data",
                type: 'pie',
                data: [
                    ["Male", 20],
                    ["Female", 30],
                ], // Replace with your data values
            },
        ],
    };*/
    screenedovertimechartOptions: Highcharts.Options = {
        title: {
            text: 'Screened Over Time',
            align: 'left',
        },

        chart: { type: "bar" },
        xAxis: [
            {
                categories: ["0-4 yrs", "5-9 yrs", "15-34 yrs"],
                title: { text: "" },
                reversed: false
            },
            {
                categories: ["0-4 yrs", "5-9 yrs", "15-34 yrs"],
                title: { text: "" },
                reversed: false,
                linkedTo: 0,
                opposite: true,
            },
        ],
        yAxis: [
            {
                // labels: {
                //     formatter: function () {
                //         return Math.abs(parseInt(this.value)).toString();
                //     },
                // },
            },
        ],
        plotOptions: { series: { stacking: "normal" }, bar: { pointWidth: 18 } },
        tooltip: {
        },
        legend: { align: "left", verticalAlign: "top", y: 0, x: 80 },
        series: [
            {
                name: "Female",
                data: [10, 60, 30],
                color: "#FC7500",
                type: 'bar'
            },
            {
                name: "Male",
                data: [-9, -41, -34],
                color: "#234FEA",
                type: 'bar'
            },
        ],


    }
}
