import { ReviewService } from './../../services/review.service.ts.service';
import { CovidPositivity } from './../../models/covidPositivity.model';
import { CovidPositivityOvertime } from './../../models/covidPositivityOverTime.model';
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
    covidPositivityOvertime: CovidPositivityOvertime[] = [];
    covidPositivityOvertimeSeries: any[][] = [];

    positives: number = 0;
    negatives: number = 0;
    highcharts = Highcharts;
    highcharts1 = Highcharts;
    highcharts2 = Highcharts;
    highcharts3 = Highcharts;
    overallpositivitychartOptions: {} = {};
    covid19PositivityOvertimeOptions: {} = {};

    constructor(private reviewService: ReviewService,) {
        //this.loadOverallPositivity();
    }

    ngOnInit() {
        this.loadCovidPositivityData();
        this.loadCovidPositivityChart();
        this.loadCovidPositivityOvertimeData();
        this.loadCovidPositivityOvertimeChart();
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

    //#region Covid-19 Positivity Overtime

    loadCovidPositivityOvertimeData() {
        this.reviewService.findCovidPositivityOvertime().subscribe(
            response => {
                this.covidPositivityOvertime = response;

                //#region Init series indexes
                //EpiWeek (Index --> 0)
                this.covidPositivityOvertimeSeries.push([]);

                // SampleTested (Index --> 1)
                this.covidPositivityOvertimeSeries.push([]);

                // CovidPositive (Index --> 2)
                this.covidPositivityOvertimeSeries.push([]);
                //#endregion

                //#region Push series data into array at specific indexes
                this.covidPositivityOvertime.forEach(dataInstance => {
                    this.covidPositivityOvertimeSeries[0].push(dataInstance.EpiWeek);
                    this.covidPositivityOvertimeSeries[1].push(dataInstance.SampleTested);
                    this.covidPositivityOvertimeSeries[2].push(dataInstance.CovidPositive);
                });
                //#endregion

                this.loadCovidPositivityOvertimeChart();
            });
    }

    loadCovidPositivityOvertimeChart() {
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
                categories: this.covidPositivityOvertimeSeries[0],
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
                    data: this.covidPositivityOvertimeSeries[1]
                },
                {
                    name: 'Positivity (%)',
                    type: 'spline',
                    color: 'red',
                    accessibility: { point: { valueSuffix: '%' } },
                    data: this.covidPositivityOvertimeSeries[2],
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
    ageCategories = [
        "0-4 yrs",
        "5-9 yrs",
        "15-34 yrs",
    ];

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
    };

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
