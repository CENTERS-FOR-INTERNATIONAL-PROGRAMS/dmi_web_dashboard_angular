import { ReviewService } from './../../services/review.service.ts.service';
import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { EnrollmentByGender } from 'src/app/models/enrollmentByGender.model';
import { EnrollmentByAgeGender } from 'src/app/models/enrollmentByAgeGender.model';
import { EnrollmentByFacility } from 'src/app/models/enrollmentByFacility.model';
import { EnrollmentOverTime } from 'src/app/models/enrollmentOverTime.model';

@Component({
    selector: 'app-enrolled',
    templateUrl: './enrolled.component.html',
    styleUrls: ['./enrolled.component.css']
})

export class EnrolledComponent {
    //#region Prerequisites --> Enrolled by Gender
    enrollmentByGender: EnrollmentByGender[] = [];
    enrollmentByGenderSeries: any[][] = [];
    enrollmentByGenderOptions: {} = {};
    //#endregion

    //#region Prerequisites --> Enrolled by Age and Gender
    enrollmentByAgeGender: EnrollmentByAgeGender[] = [];
    enrollmentByAgeGenderSeries: any[][] = [];
    enrollmentByAgeGenderOptions: {} = {};
    //#endregion

    //#region Prerequisites --> Enrolled by Facility
    enrollmentByFacility: EnrollmentByFacility[] = [];
    enrollmentByFacilitySeries: any[][] = [];
    enrollmentByFacilityOptions: {} = {};
    //#endregion

    //#region Prerequisites --> Enrolled by EpiWeek
    enrollmentOverTime: EnrollmentOverTime[] = [];
    enrollmentOverTimeSeries: any[][] = [];
    enrollmentOverTimeOptions: {} = {};
    //#endregion

    constructor(private reviewService: ReviewService,) {
        //this.loadOverallPositivity();
    }

    ngOnInit() {
        this.loadEnrollmentByGenderData();
        this.loadEnrollmentByGenderChart();

        this.loadEnrollmentByAgeGenderData();
        this.loadEnrollmentByAgeGenderChart();

        this.loadEnrollmentByFacilityData();
        this.loadEnrollmentByFacilityChart();

        this.loadEnrollmentOverTimeData();
        this.loadEnrollmentOverTimeChart();
    }

    //#region Load Chart --> Enrollment by Gender
    loadEnrollmentByGenderData() {
        this.reviewService.findEnrollmentByGender().subscribe(
            response => {
                this.enrollmentByGender = response;

                //#region Push series data into array at specific indexes
                //Male Series (Index --> 0)
                this.enrollmentByGenderSeries.push([]);
                this.enrollmentByGenderSeries[0].push(this.enrollmentByGender[0].Male_Screened);
                this.enrollmentByGenderSeries[0].push(this.enrollmentByGender[0].Male_Eligible);
                this.enrollmentByGenderSeries[0].push(this.enrollmentByGender[0].Male_Enrolled);

                //Female Series (Index --> 1)
                this.enrollmentByGenderSeries.push([]);
                this.enrollmentByGenderSeries[1].push(this.enrollmentByGender[0].Female_Screened);
                this.enrollmentByGenderSeries[1].push(this.enrollmentByGender[0].Female_Eligible);
                this.enrollmentByGenderSeries[1].push(this.enrollmentByGender[0].Female_Enrolled);
                //#endregion

                this.loadEnrollmentByGenderChart();
            });
    }

    loadEnrollmentByGenderChart() {
        this.enrollmentByGenderOptions = {
            title: {
                text: 'Enrollment by Gender',
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
                    data: this.enrollmentByGenderSeries[0]
                },
                {
                    name: 'FEMALE',
                    data: this.enrollmentByGenderSeries[1]
                },

            ]
        };

        HC_exporting(Highcharts);
    }
    //#endregion

    //#region Load Chart --> Enrollment by Age and Gender
    loadEnrollmentByAgeGenderData() {
        this.reviewService.findEnrollmentByAgeGender().subscribe(
            response => {
                this.enrollmentByAgeGender = response;

                //#region Init series indexes
                // Age Group(Index --> 0)
                this.enrollmentByAgeGenderSeries.push([]);
                this.enrollmentByAgeGenderSeries[0].push("0-4 Yrs");
                this.enrollmentByAgeGenderSeries[0].push("5-14 Yrs");
                this.enrollmentByAgeGenderSeries[0].push("15-34 Yrs");
                this.enrollmentByAgeGenderSeries[0].push("35-64 Yrs");
                this.enrollmentByAgeGenderSeries[0].push("65-84 Yrs");
                this.enrollmentByAgeGenderSeries[0].push("85+ Yrs");

                //Positivity - Female (Index --> 1)
                this.enrollmentByAgeGenderSeries.push([]);

                //Positivity - Male (Index --> 2)
                this.enrollmentByAgeGenderSeries.push([]);
                //#endregion

                //#region Push series data into array at specific indexes
                this.enrollmentByAgeGenderSeries[0].forEach(ageGroupInstance => {
                    //Compile Female Positivity
                    let female_found = false;
                    let male_found = false;

                    this.enrollmentByAgeGender.forEach(dataInstance => {
                        if (dataInstance.AgeGroup == ageGroupInstance) {
                            //Compile Female (Index --> 1)
                            if (dataInstance.Gender == "Female") {
                                this.enrollmentByAgeGenderSeries[1].push(dataInstance.EnrolledNumber);
                                female_found = true;
                            }

                            //Compile Male (Index --> 2)
                            else if (dataInstance.Gender == "Male") {
                                this.enrollmentByAgeGenderSeries[2].push(dataInstance.EnrolledNumber * -1);
                                male_found = true;
                            }
                        }
                    });

                    if (!female_found) {
                        this.enrollmentByAgeGenderSeries[1].push(0);
                    }

                    if (!male_found) {
                        this.enrollmentByAgeGenderSeries[2].push(0);
                    }
                });
                //#endregion

                this.loadEnrollmentByAgeGenderChart();
            });
    }

    loadEnrollmentByAgeGenderChart() {
        this.enrollmentByAgeGenderOptions = {
            title: {
                text: 'Enrolled By Age and Gender',
                align: 'left',
            },
            chart: { type: "bar" },
            xAxis: [
                {
                    categories: this.enrollmentByAgeGenderSeries[0],
                    title: { text: "" },
                    reversed: false
                },
                {
                    categories: this.enrollmentByAgeGenderSeries[0],
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
                    name: "Male",
                    data: this.enrollmentByAgeGenderSeries[2],
                    color: "#234FEA",
                    type: 'bar'
                },
                {
                    name: "Female",
                    data: this.enrollmentByAgeGenderSeries[1],
                    color: "#FC7500",
                    type: 'bar'
                }
            ]
        };
    }
    //#endregion

    //#region Load Chart --> Enrollment by Facility
    loadEnrollmentByFacilityData() {
        this.reviewService.findEnrollmentByFacility().subscribe(
            response => {
                this.enrollmentByFacility = response;

                //#region Init series indexes
                // Facilities (Index --> 0)
                this.enrollmentByFacilitySeries.push([]);

                //Enrolled (Index --> 1)
                this.enrollmentByFacilitySeries.push([]);

                //Positive (Index --> 2)
                this.enrollmentByFacilitySeries.push([]);
                //#endregion

                //#region Push series data into array at specific indexes
                this.enrollmentByFacility.forEach(dataInstance => {
                    //Compile Facilities (Index --> 0)
                    this.enrollmentByFacilitySeries[0].push(dataInstance.Facility);

                    //Compile Enrollments (Index --> 1)
                    this.enrollmentByFacilitySeries[1].push(dataInstance.EnrolledNumber);

                    //Compile Positives (Index --> 2)
                    this.enrollmentByFacilitySeries[2].push(dataInstance.Covid19Positive);
                });
                //#endregion

                this.loadEnrollmentByFacilityChart();
            });
    }

    loadEnrollmentByFacilityChart() {
        this.enrollmentByFacilityOptions = {
            title: {
                text: 'Enrollment By Facility',
                align: 'left'
            },
            chart: {
                type: "column",
            },
            xAxis: {
                categories: this.enrollmentByFacilitySeries[0],
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
                    data: this.enrollmentByFacilitySeries[1],
                    type: 'column',
                    color: "#234FEA",
                },
                {
                    showInLegend: true,
                    name: "Positive",
                    data: this.enrollmentByFacilitySeries[2],
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

    //#region Load Chart --> Enrollment by Over Time
    loadEnrollmentOverTimeData() {
        this.reviewService.findEnrollmentOverTime().subscribe(
            response => {
                this.enrollmentOverTime = response;

                console.log(this.enrollmentOverTime);

                //#region Init series indexes
                // EpiWeek (Index --> 0)
                this.enrollmentOverTimeSeries.push([]);

                //Elligible (Index --> 1)
                this.enrollmentOverTimeSeries.push([]);

                //Enrolled (Index --> 2)
                this.enrollmentOverTimeSeries.push([]);
                //#endregion

                //#region Push series data into array at specific indexes
                this.enrollmentOverTime.forEach(dataInstance => {
                    //Compile EpiWeek
                    this.enrollmentOverTimeSeries[0].push(dataInstance.EpiWeek);

                    //Compile Elligible
                    this.enrollmentOverTimeSeries[1].push(dataInstance.ElligibleNumber);

                    //Compile Enrolled
                    this.enrollmentOverTimeSeries[2].push(dataInstance.EnrolledNumber);
                });
                //#endregion

                this.loadEnrollmentOverTimeChart();
            });
    }

    loadEnrollmentOverTimeChart() {
        this.enrollmentOverTimeOptions = {
            title: {
                text: 'Enrolled Over Time',
                align: 'left'
            },
            chart: {
                // type: "line"
            },
            xAxis: {
                categories: this.enrollmentOverTimeSeries[0],
            },
            yAxis: {
                title: {
                    text: "Enrolled",
                }
            },
            series: [
                {
                    name: "Elligible",
                    data: this.enrollmentOverTimeSeries[1],
                    color: "#234FEA",
                    type: "column"
                },
                {
                    name: "Enrolled",
                    data: this.enrollmentOverTimeSeries[2],
                    color: "red",
                    type: "line"
                }
            ]
        };
    }
    //#endregion

    Highcharts: typeof Highcharts = Highcharts;
}