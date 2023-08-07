import { ReviewService } from './../../services/review.service.ts.service';
import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { EnrollmentByGender } from 'src/app/models/enrollmentByGender.model';
import { EnrollmentByAgeGender } from 'src/app/models/enrollmentByAgeGender.model';
import { EnrollmentByFacility } from 'src/app/models/enrollmentByFacility.model';
import { EnrollmentByEpiWeek } from 'src/app/models/enrollmentByEpiWeek.model';

@Component({
    selector: 'app-enrolled',
    templateUrl: './enrolled.component.html',
    styleUrls: ['./enrolled.component.css']
})

export class EnrolledComponent {
    //#region Prerequisites --> Enrolled by Gender
    enrollmentByGender: EnrollmentByGender[] = [];
    enrollmentByGenderSeries: any[] = [];
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
    enrollmentByEpiWeek: EnrollmentByEpiWeek[] = [];
    enrollmentByEpiWeekSeries: any[][] = [];
    enrollmentByEpiWeekOptions: {} = {};
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

        this.loadEnrollmentByEpiWeekData();
        this.loadEnrollmentByEpiWeekChart();
    }

    //#region Load Chart --> Enrollment by Gender
    loadEnrollmentByGenderData() {
        this.reviewService.findEnrollmentByGender().subscribe(
            response => {
                this.enrollmentByGender = response;

                //#region Push series data into array at specific indexes
                this.enrollmentByGender.forEach(dataInstance => {
                    if (dataInstance.Gender == "Male") {
                        this.enrollmentByGenderSeries.push(dataInstance.Enrolled);
                    }

                    else if (dataInstance.Gender == "Female") {
                        this.enrollmentByGenderSeries.push(dataInstance.Enrolled);
                    }
                });
                //#endregion

                this.loadEnrollmentByGenderChart();
            });
    }

    loadEnrollmentByGenderChart() {
        this.enrollmentByGenderOptions = {
            title: {
                text: 'Enrolled By Gender',
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
                        ["Male", this.enrollmentByGenderSeries[0]],
                        ["Female", this.enrollmentByGenderSeries[1]]
                    ]
                }
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
                            if (dataInstance.Gender == "Female") {
                                this.enrollmentByAgeGenderSeries[1].push(dataInstance.Enrolled);
                                female_found = true;
                            }

                            //Compile Male Positivity
                            else if (dataInstance.Gender == "Male") {
                                this.enrollmentByAgeGenderSeries[2].push(dataInstance.Enrolled * -1);
                                male_found = true;
                            }
                        }
                    });

                    if (!female_found) {
                        this.enrollmentByAgeGenderSeries[1].push(0);
                        console.log(ageGroupInstance, "!Female");
                    }

                    if (!male_found) {
                        this.enrollmentByAgeGenderSeries[2].push(0);
                        console.log(ageGroupInstance, "!Male");
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
                    name: "Female",
                    data: this.enrollmentByAgeGenderSeries[1],
                    color: "#FC7500",
                    type: 'bar'
                },
                {
                    name: "Male",
                    data: this.enrollmentByAgeGenderSeries[2],
                    color: "#234FEA",
                    type: 'bar'
                },
            ],
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
                //#endregion

                //#region Push series data into array at specific indexes
                this.enrollmentByFacility.forEach(dataInstance => {
                    //Compile Facilities
                    this.enrollmentByFacilitySeries[0].push(dataInstance.Facility);

                    //Compile Enrollments
                    this.enrollmentByFacilitySeries[1].push(dataInstance.Enrolled);
                });
                //#endregion

                this.loadEnrollmentByFacilityChart();
            });
    }

    loadEnrollmentByFacilityChart() {
        this.enrollmentByFacilityOptions = {
            title: {
                text: 'Enrolled By Health Facilities',
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
                    showInLegend: false,
                    name: "Health Facilities",
                    data: this.enrollmentByFacilitySeries[1],
                    type: 'column',
                    color: "#234FEA",
                }
            ]
        };
    }
    //#endregion

    //#region Load Chart --> Enrollment by EpiWeek
    loadEnrollmentByEpiWeekData() {
        this.reviewService.findEnrollmentByEpiWeek().subscribe(
            response => {
                this.enrollmentByEpiWeek = response;

                console.log(this.enrollmentByEpiWeek);

                //#region Init series indexes
                // EpiWeek (Index --> 0)
                this.enrollmentByEpiWeekSeries.push([]);

                //Enrolled (Index --> 1)
                this.enrollmentByEpiWeekSeries.push([]);
                //#endregion

                //#region Push series data into array at specific indexes
                this.enrollmentByEpiWeek.forEach(dataInstance => {
                    //Compile EpiWeek
                    this.enrollmentByEpiWeekSeries[0].push(dataInstance.EpiWeek);

                    //Compile Enrollments
                    this.enrollmentByEpiWeekSeries[1].push(dataInstance.Enrolled);
                });
                //#endregion

                this.loadEnrollmentByEpiWeekChart();
            });
    }

    loadEnrollmentByEpiWeekChart() {
        this.enrollmentByEpiWeekOptions = {
            title: {
                text: 'Enrolled By Epi Week',
                align: 'left'
            },
            chart: {
                type: "line"
            },
            xAxis: {
                categories: this.enrollmentByEpiWeekSeries[0],
            },
            yAxis: {
                title: {
                    text: "Enrolled",
                }
            },
            series: [
                {
                    name: "Epi Week",
                    data: this.enrollmentByEpiWeekSeries[1],
                    color: "#234FEA",
                }
            ]
        };
    }
    //#endregion

    Highcharts: typeof Highcharts = Highcharts;




















}


