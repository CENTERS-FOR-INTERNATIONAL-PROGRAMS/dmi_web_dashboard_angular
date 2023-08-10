import { ReviewService } from './../../services/review.service.ts.service';
import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { ScreeningByGender } from 'src/app/models/screeningByGender.model';
import { ScreeningByAgeGender } from 'src/app/models/screeningByAgeGender.model';
import { ScreeningByFacility } from 'src/app/models/screeningByFacility.model';
import { ScreeningByOverTime } from 'src/app/models/screeningByOvertime.model';

@Component({
    selector: 'app-screened',
    templateUrl: './screened.component.html',
    styleUrls: ['./screened.component.css']
})

export class ScreenedComponent {
    //#region Prerequisites --> Screening by Gender
    screeningByGender: ScreeningByGender[] = [];
    screeningByGenderSeries: any[] = [];
    screeningByGenderChartOptions: {} = {};
    //#endregion

    //#region Prerequisites --> Screening by Age and Gender
    ScreeningByAgeGender: ScreeningByAgeGender[] = [];
    ScreeningByAgeGenderSeries: any[][] = [];
    screeningbyageandgenderchartOptions: {} = {};
    //#endregion

    //#region Prerequisites --> Screening by Facility
    screeningByFacility: ScreeningByFacility[] = [];
    screeningByFacilitySeries: any[][] = [];
    screeningByFacilitiesChartOptions: {} = {};
    //#endregion

    //#region Prerequisites --> Screening by Overtime
    ScreeningByOverTime: ScreeningByOverTime[] = [];
    ScreeningByOverTimeSeries: any[][] = [];
    screenedovertimechartOptions: {} = {};
    //#endregion

    constructor(private reviewService: ReviewService,) {
        //this.loadOverallPositivity();
    }

    ngOnInit() {
        this.loadScreeningByGenderData();
        this.loadScreeningByGenderChart();

        this.loadScreeningByAgeGenderData();
        this.loadScreeningByAgeGenderChart();

        this.loadScreeningByFacilityData();
        this.loadScreeningByFacilityChart();

        this.loadScreeningByOverTimeData();
        this.loadScreeningByOverTimeChart();
    }

    //#region Load Chart --> Screening by Gender
    loadScreeningByGenderData() {
        this.reviewService.findEnrollmentByGender().subscribe(
            response => {
                this.screeningByGender = response;

                //#region Push series data into array at specific indexes
                //Male Series (Index --> 0)
                this.screeningByGenderSeries.push([]);
                this.screeningByGenderSeries[0].push(this.screeningByGender[0].Male_Screened);
                this.screeningByGenderSeries[0].push(this.screeningByGender[0].Male_Eligible);
                this.screeningByGenderSeries[0].push(this.screeningByGender[0].Male_Enrolled);

                //Female Series (Index --> 1)
                this.screeningByGenderSeries.push([]);
                this.screeningByGenderSeries[1].push(this.screeningByGender[0].Female_Screened);
                this.screeningByGenderSeries[1].push(this.screeningByGender[0].Female_Eligible);
                this.screeningByGenderSeries[1].push(this.screeningByGender[0].Female_Enrolled);
                //#endregion

                this.loadScreeningByGenderChart();
            });
    }

    loadScreeningByGenderChart() {
        this.screeningByGenderChartOptions = {
            title: {
                text: 'Screening by Gender',
                align: 'left'
            },
            chart: {
                type: 'column'
            },
            xAxis: {
                categories: ['Screened', 'Elligible', 'Enrolled'],
                crosshair: true,
                accessibility: {
                    description: 'Categories'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number'
                }
            },
            tooltip: {
                valueSuffix: ''
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [
                {
                    name: 'MALE',
                    data: this.screeningByGenderSeries[0]
                },
                {
                    name: 'FEMALE',
                    data: this.screeningByGenderSeries[1]
                }
            ]
        };

        HC_exporting(Highcharts);
    }
    //#endregion

    //#region Load Chart --> Screening by Facility
    loadScreeningByFacilityData() {
        this.reviewService.findScreeningByFacility().subscribe(
            response => {
                this.screeningByFacility = response;

                //#region Init series indexes
                // Facilities (Index --> 0)
                this.screeningByFacilitySeries.push([]);

                //Enrolled (Index --> 1)
                this.screeningByFacilitySeries.push([]);

                //Positive (Index --> 2)
                this.screeningByFacilitySeries.push([]);
                //#endregion

                //#region Push series data into array at specific indexes
                this.screeningByFacility.forEach(dataInstance => {
                    //Compile Facilities
                    this.screeningByFacilitySeries[0].push(dataInstance.Facility);

                    //Compile Enrollments
                    this.screeningByFacilitySeries[1].push(dataInstance.Enrolled);

                    //Compile Positives
                    this.screeningByFacilitySeries[2].push(dataInstance.Covid19Positive);
                });
                //#endregion

                this.loadScreeningByFacilityChart();
            });
    }

    loadScreeningByFacilityChart() {
        this.screeningByFacilitiesChartOptions = {
            title: {
                text: 'Enrollment By Facility',
                align: 'left'
            },
            chart: {
                type: "column",
            },
            xAxis: {
                categories: this.screeningByFacilitySeries[0],
                title: false
            },
            yAxis: {
                title: {
                    text: "Enrolled",
                }
            },
            series: [
                {
                    showInLegend: true,
                    name: "Enrolled",
                    data: this.screeningByFacilitySeries[1],
                    type: 'column',
                    color: "#234FEA",
                },
                {
                    showInLegend: true,
                    name: "Positive",
                    data: this.screeningByFacilitySeries[2],
                    type: 'column',
                    color: "red",
                }
            ],
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
        };
    }
    //#endregion

    //#region Load Chart --> Screening by Age and Gender
    loadScreeningByAgeGenderData() {
        this.reviewService.findScreeningByAgeGender().subscribe(
            response => {
                this.ScreeningByAgeGender = response;

                //#region Init series indexes
                // Age Group(Index --> 0)
                this.ScreeningByAgeGenderSeries.push([]);
                this.ScreeningByAgeGenderSeries[0].push("0-4 Yrs");
                this.ScreeningByAgeGenderSeries[0].push("5-14 Yrs");
                this.ScreeningByAgeGenderSeries[0].push("15-34 Yrs");
                this.ScreeningByAgeGenderSeries[0].push("35-64 Yrs");
                this.ScreeningByAgeGenderSeries[0].push("65-84 Yrs");
                this.ScreeningByAgeGenderSeries[0].push("85+ Yrs");

                //Positivity - Female (Index --> 1)
                this.ScreeningByAgeGenderSeries.push([]);

                //Positivity - Male (Index --> 2)
                this.ScreeningByAgeGenderSeries.push([]);
                //#endregion

                //#region Push series data into array at specific indexes
                this.ScreeningByAgeGenderSeries[0].forEach(ageGroupInstance => {
                    this.ScreeningByAgeGender.forEach(dataInstance => {
                        //Compile Female (Index --> 1)
                        if ((dataInstance.AgeGroup == ageGroupInstance) && (dataInstance.Gender == "Female")) {
                            this.ScreeningByAgeGenderSeries[1].push(dataInstance.Screened);
                        }

                        //Compile Male (Index --> 2)
                        if ((dataInstance.AgeGroup == ageGroupInstance) && (dataInstance.Gender == "Male")) {
                            this.ScreeningByAgeGenderSeries[2].push(dataInstance.Screened * -1);
                        }
                    });
                });
                //#endregion

                this.loadScreeningByAgeGenderChart();
            });
    }
    loadScreeningByAgeGenderChart() {
        this.screeningbyageandgenderchartOptions = {
            title: {
                text: 'Screening By Age and Gender',
                align: 'left',
            },
            chart: { type: "bar" },
            xAxis: [
                {
                    categories: this.ScreeningByAgeGenderSeries[0],
                    title: { text: "" },
                    reversed: false
                },
                {
                    categories: this.ScreeningByAgeGenderSeries[0],
                    title: { text: "" },
                    reversed: false,
                    linkedTo: 0,
                    opposite: true,
                }
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
                    name: "Male",
                    data: this.ScreeningByAgeGenderSeries[2],
                    color: "#234FEA",
                    type: 'bar'
                },
                {
                    name: "Female",
                    data: this.ScreeningByAgeGenderSeries[1],
                    color: "#FC7500",
                    type: 'bar'
                }
            ],
        };
    }
    //#endregion

    //#region Load Chart --> Screening by Overtime
    loadScreeningByOverTimeData() {
        this.reviewService.findScreeningByOvertime().subscribe(
            response => {
                this.ScreeningByOverTime = response;

                console.log(this.ScreeningByOverTime);

                //#region Init series indexes
                // EpiWeek (Index --> 0)
                this.ScreeningByOverTimeSeries.push([]);

                //Enrolled (Index --> 1)
                this.ScreeningByOverTimeSeries.push([]);
                //#endregion

                //#region Push series data into array at specific indexes
                this.ScreeningByOverTime.forEach(dataInstance => {
                    //Compile EpiWeek
                    this.ScreeningByOverTimeSeries[0].push(dataInstance.EpiWeek);

                    //Compile Screenings
                    this.ScreeningByOverTimeSeries[1].push(dataInstance.Screened);
                });
                //#endregion

                this.loadScreeningByOverTimeChart();
            });
    }

    loadScreeningByOverTimeChart() {
        this.screenedovertimechartOptions = {
            title: {
                text: 'Screened over time',
                align: 'left'
            },
            chart: {
                type: "line"
            },
            xAxis: {
                categories: this.ScreeningByOverTimeSeries[0],
            },
            yAxis: {
                title: {
                    text: "Enrolled",
                }
            },
            series: [
                {
                    name: "Epi Week",
                    data: this.ScreeningByOverTimeSeries[1],
                    color: "#234FEA",
                }
            ]
        };
    }
    //#endregion

    Highcharts: typeof Highcharts = Highcharts;








}

