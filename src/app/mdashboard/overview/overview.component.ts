import { ReviewService } from './../../services/review.service.ts.service';
import { CovidPositivity } from './../../models/covidPositivity.model';
import { CovidPositivityOvertime } from './../../models/covidPositivityOverTime.model';
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

    //#region Prerequisites --> COVID-19 Positivity
    covid19Positivity: CovidPositivity[] = [];
    covid19PositivitySeries: any[] = [];
    covid19PositivityOptions: {} = {};
    //#endregion

    //#region Prerequisites --> COVID-19 positivity overtime
    covid19PositivityOvertime: CovidPositivityOvertime[] = [];
    covid19PositivityOvertimeSeries: any[][] = [];
    covid19PositivityOvertimeOptions: {} = {};
    //#endregion

    //#region Prerequisites --> COVID-19 positivity by age gender
    covidPositivityByAgeGender: CovidPositivityByAgeGender[] = [];
    covid19PositivityByAgeGenderSeries: any[][] = [];
    covid19PositivityByAgeGenderOptions: {} = {};
    //#endregion

    highcharts = Highcharts;
    highcharts1 = Highcharts;
    highcharts2 = Highcharts;
    highcharts3 = Highcharts;

    constructor(private reviewService: ReviewService,) {
        //this.loadOverallPositivity();
    }

    ngOnInit() {
        this.loadCovid19PositivityData();
        this.loadCovid19PositivityChart();

        this.loadCovid19PositivityOvertimeData();
        this.loadCovid19PositivityOvertimeChart();

        this.loadCovid19PositivityByAgeGenderData();
        this.loadCovid19PositivityByAgeGenderChart();
    }

    //#region Load CHart --> Covid-19 Positivity
    loadCovid19PositivityData() {
        this.reviewService.findCovid19Positivity().subscribe(
            response => {
                this.covid19Positivity = response;

                //#region Push series data into array at specific indexes
                this.covid19Positivity.forEach(dataInstance => {
                    // Covid-19 Positive (Index --> 0)
                    this.covid19PositivitySeries.push(dataInstance.Covid19Positive);

                    // Covid-19 Negative (Index --> 1)
                    this.covid19PositivitySeries.push(dataInstance.Covid19Negative);
                });
                //#endregion

                this.loadCovid19PositivityChart();
            });
    }

    loadCovid19PositivityChart() {
        this.covid19PositivityOptions = {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'COVID-19 Positivity',
            },
            colors: [
                "#FF0000",
                "green",
            ],
            series: [{
                name: "Data",
                data: [
                    {
                        name: 'Positives',
                        y: this.covid19PositivitySeries[0]

                    }, {
                        name: 'Negatives',
                        y: this.covid19PositivitySeries[1]
                    }
                ]
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
                    //Compile Female Positivity
                    let female_found = false;
                    let male_found = false;

                    this.covidPositivityByAgeGender.forEach(dataInstance => {
                        if (dataInstance.AgeGroup == ageGroupInstance) {
                            if (dataInstance.Gender == "Female") {
                                this.covid19PositivityByAgeGenderSeries[1].push(dataInstance.PositiveNumber);
                                female_found = true;
                            }

                            //Compile Male Positivity
                            else if (dataInstance.Gender == "Male") {
                                this.covid19PositivityByAgeGenderSeries[2].push(dataInstance.PositiveNumber * -1);
                                // this.covid19PositivityByAgeGenderSeries[2].push(dataInstance.PositiveNumber);
                                male_found = true;
                            }
                        }
                    });

                    if (!female_found) {
                        this.covid19PositivityByAgeGenderSeries[1].push(0);
                        console.log(ageGroupInstance, "!Female");
                    }

                    if (!male_found) {
                        this.covid19PositivityByAgeGenderSeries[2].push(0);
                        console.log(ageGroupInstance, "!Male");
                    }
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
            chart:
            {
                type: "bar"
            },
            accessibility: {
                point: {
                    valueDescriptionFormat: '{index}. Age {xDescription}, {value}%.'
                }
            },
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
                    opposite: true,
                    linkedTo: 0,
                },
            ],
            yAxis: [
                {
                    title: {
                        text: "Positivity"
                    },
                    labels: {
                        format: '{value}' //TODO! Format to remove netagive values
                    },
                    accessibility: {
                        description: 'Percentage population',
                        rangeDescription: 'Range: 0 to 5%'
                    }
                }
            ],
            plotOptions: {
                series: {
                    stacking: "normal",
                    borderRadius: '50%'
                },
                bar: {
                    pointWidth: 18
                }
            },
            tooltip: {
                format: '<b>{series.name}, age {point.category}</b><br/>' +
                    'Population: {(abs point.y):.1f}%'
            },
            legend: { align: "left", verticalAlign: "top", y: 0, x: 80 },
            series: [
                {
                    name: "Female",
                    data: this.covid19PositivityByAgeGenderSeries[1],
                    color: "#FC7500",
                },
                {
                    name: "Male",
                    data: this.covid19PositivityByAgeGenderSeries[2],
                    color: "#234FEA",
                },
            ],
        };
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
                    type: 'line',
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
}
