import { ReviewService } from './../../services/review.service.ts.service';
import { CovidPositivity } from './../../models/covidPositivity.model';
import { CovidPositivityOverTime } from './../../models/covidPositivityOverTime.model';
import { CovidPositivityByAgeGender } from './../../models/covidPositivityByAgeGender.model';
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

    //#region Prerequisites --> COVID-19 positivity overtime
    covid19PositivityOvertime: CovidPositivityOverTime[] = [];
    covid19PositivityOvertimeSeries: any[][] = [];
    covid19PositivityOvertimeOptions: {} = {};
    //#endregion

    //#region Prerequisites --> COVID-19 positivity by age gender
    covidPositivityByAgeGender: CovidPositivityByAgeGender[] = [];
    covid19PositivityByAgeGenderSeries: any[][] = [];
    covid19PositivityByAgeGenderOptions: {} = {};
    //#endregion

    positives: number = 0;
    negatives: number = 0;
    highcharts = Highcharts;
    highcharts1 = Highcharts;
    highcharts2 = Highcharts;
    highcharts3 = Highcharts;
    overallpositivitychartOptions: {} = {};

    constructor(private reviewService: ReviewService,) {
        //this.loadOverallPositivity();
    }

    ngOnInit() {
        this.loadCovidPositivityData();
        this.loadCovidPositivityChart();

        this.loadCovid19PositivityOvertimeData();
        this.loadCovid19PositivityOvertimeChart();

        this.loadCovid19PositivityByAgeGenderData();
        this.loadCovid19PositivityByAgeGenderChart();
    }

    //#region Covid-19 Positivity
    loadCovidPositivityData() {
        this.reviewService.findCovidPositivity().subscribe(
            response => {
                this.covidPositivity = response;
                this.positives = this.covidPositivity[0].Covid19Positive;
                this.negatives = this.covidPositivity[0].Covid19Negative;
                this.loadCovidPositivityChart();
            });
    }

    loadCovidPositivityChart() {
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
    //#endregion

    //#region Load Chart --> COVID-19 Positivity Overtime
    loadCovid19PositivityOvertimeData() {
        this.reviewService.findCovidPositivityOvertime().subscribe(
            response => {
                this.covid19PositivityOvertime = response;

                //#region Init series indexes
                //EpiWeek (Index --> 0)
                this.covid19PositivityOvertimeSeries.push([]);

                // SampleTested (Index --> 1)
                this.covid19PositivityOvertimeSeries.push([]);

                // CovidPositive (Index --> 2)
                this.covid19PositivityOvertimeSeries.push([]);
                //#endregion

                //#region Push series data into array at specific indexes
                this.covid19PositivityOvertime.forEach(dataInstance => {
                    this.covid19PositivityOvertimeSeries[0].push(dataInstance.EpiWeek);
                    this.covid19PositivityOvertimeSeries[1].push(dataInstance.SampleTested);
                    this.covid19PositivityOvertimeSeries[2].push(dataInstance.CovidPositive);
                });
                //#endregion

                this.loadCovid19PositivityOvertimeChart();
            });
    }

    loadCovid19PositivityOvertimeChart() {
        this.covid19PositivityOvertimeOptions = {
            chart: {
                // type: 'pie'
            },
            title: {
                text: 'Covid-19 Positivity Overtime',
                align: 'left'
            },
            xAxis: [{
                title: {
                    text: 'Epi Week'
                },
                categories: this.covid19PositivityOvertimeSeries[0],
                crosshair: true
            }],
            yAxis: [
                { // Primary yAxis
                    labels: {
                        format: '{value}',
                        // style: {
                        //     color: Highcharts.getOptions().colors[1]
                        // }
                    },
                    title: {
                        text: 'Samples Tested',
                        // style: {
                        //     color: Highcharts.getOptions().colors[1]
                        // }
                    }
                },
                { // Secondary yAxis
                    title: {
                        text: 'Covid-19 Positive',
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
                }
            ],
            colors: [
                "#FF0000",
                "green",
            ],
            series: [
                {
                    name: 'Samples Tested',
                    type: 'column',
                    color: '#234FEA',
                    yAxis: 1,
                    data: this.covid19PositivityOvertimeSeries[1]
                },
                {
                    name: 'Positivity (%)',
                    type: 'spline',
                    color: 'red',
                    accessibility: { point: { valueSuffix: '%' } },
                    data: this.covid19PositivityOvertimeSeries[2],
                }
            ],
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
    //#endregion

    //#region Load Chart --> COVID-19 Positivity By Age and Gender
    loadCovid19PositivityByAgeGenderData() {
        this.reviewService.findCovid19PositivityByAgeGender().subscribe(
            response => {
                this.covidPositivityByAgeGender = response;

                //#region Init series indexes
                // Age Group(Index --> 0)
                this.covid19PositivityByAgeGenderSeries.push([]);
                this.covid19PositivityByAgeGenderSeries[0].push("0-4 Yrs");
                this.covid19PositivityByAgeGenderSeries[0].push("5-14 Yrs");
                this.covid19PositivityByAgeGenderSeries[0].push("15-34 Yrs");
                this.covid19PositivityByAgeGenderSeries[0].push("35-64 Yrs");
                this.covid19PositivityByAgeGenderSeries[0].push("65-84 Yrs");
                this.covid19PositivityByAgeGenderSeries[0].push("85+ Yrs");

                //Positivity - Female (Index --> 1)
                this.covid19PositivityByAgeGenderSeries.push([]);

                //Positivity - Male (Index --> 2)
                this.covid19PositivityByAgeGenderSeries.push([]);
                //#endregion

                //#region Push series data into array at specific indexes
                this.covid19PositivityByAgeGenderSeries[0].forEach(ageGroupInstance => {
                    this.covidPositivityByAgeGender.forEach(dataInstance => {
                        //Compile Male Positivity
                        if ((dataInstance.AgeGroup == ageGroupInstance) && (dataInstance.Gender == "Female")) {
                            this.covid19PositivityByAgeGenderSeries[1].push(dataInstance.PositiveNumber);
                        }

                        //Compile Female Positivity
                        if ((dataInstance.AgeGroup == ageGroupInstance) && (dataInstance.Gender == "Male")) {
                            this.covid19PositivityByAgeGenderSeries[2].push(dataInstance.PositiveNumber * -1);
                        }
                    });
                });
                //#endregion

                this.loadCovid19PositivityByAgeGenderChart();
            });
    }

    loadCovid19PositivityByAgeGenderChart() {
        this.covid19PositivityByAgeGenderOptions = {
            title: {
                text: 'Covid-19 Positivity By Age and Gender',
                align: 'left',
            },
            chart: { type: "bar" },
            xAxis: [
                {
                    categories: this.covid19PositivityByAgeGenderSeries[0],
                    title: { text: "" },
                    reversed: false
                },
                {
                    categories: this.covid19PositivityByAgeGenderSeries[0],
                    title: { text: "" },
                    reversed: false,
                    linkedTo: 0,
                    opposite: true,
                },
            ],
            yAxis: [
                {
                    title: {
                        text: "Positivity"
                    }
                }
            ],
            plotOptions: { series: { stacking: "normal" }, bar: { pointWidth: 18 } },
            tooltip: {
            },
            legend: { align: "left", verticalAlign: "top", y: 0, x: 80 },
            series: [
                {
                    name: "Female",
                    data: this.covid19PositivityByAgeGenderSeries[1],
                    color: "#FC7500",
                    type: 'bar'
                },
                {
                    name: "Male",
                    data: this.covid19PositivityByAgeGenderSeries[2],
                    color: "#234FEA",
                    type: 'bar'
                },
            ],
        };
    }
    //#endregion

    /*    Highcharts: typeof Highcharts = Highcharts;
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
           },
       }; */

    overallpositivitybyfacilitychartOptions: Highcharts.Options = {
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
    };

    covid19positivitybygenderchartOptions: Highcharts.Options = {

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
        credits: {
          enabled: false
      },
    };
}
