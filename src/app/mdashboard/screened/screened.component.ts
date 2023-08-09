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
ScreeningByGender: ScreeningByGender[] = [];
ScreeningByGenderSeries: any[] = [];
screenedbygenderchartOptions: {} = {};
//#endregion

//#region Prerequisites --> Screening by Age and Gender
ScreeningByAgeGender: ScreeningByAgeGender[] = [];
ScreeningByAgeGenderSeries: any[][] = [];
screeningbyageandgenderchartOptions: {} = {};
//#endregion

//#region Prerequisites --> Screening by Facility
ScreeningByFacility: ScreeningByFacility[] = [];
ScreeningByFacilitySeries: any[][] = [];
screenedbyhealthfacilitieschartOptions: {} = {};
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
    this.reviewService.findScreeningByGender().subscribe(
        response => {
            this.ScreeningByGender = response;

            //#region Push series data into array at specific indexes
            this.ScreeningByGender.forEach(dataInstance => {
                if (dataInstance.Gender == "Male") {
                    this.ScreeningByGenderSeries.push(dataInstance.Screened);
                }

                else if (dataInstance.Gender == "Female") {
                    this.ScreeningByGenderSeries.push(dataInstance.Screened);
                }
            });
            //#endregion

            this.loadScreeningByGenderChart();
        });
}
loadScreeningByGenderChart() {
    this.screenedbygenderchartOptions = {
        title: {
            text: 'Screening by Gender',
          },
          chart: {
            type: 'column',
          },
          // subtitle: {
          //     text:
          //         'Source: <a target="_blank" ' +
          //         'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
          //     align: 'left'
          //  },
          xAxis: {
            categories: ['Enrolled', 'Tested', 'Positive'],
            crosshair: true,
            accessibility: {
              description: 'Categories',
            },
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Number Screened',
            },
          },
          tooltip: {
            valueSuffix: '',
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0,
            },
          },
          series: [
            {
              name: 'MALE',
              data: [62403, 123232, 77000],
              color:'#234FEA'
            },
            {
              name: 'FEMALE',
              data: [51086, 106000, 75500],
              color:'#FC7500'
            },
          ],
        


    };

    HC_exporting(Highcharts);
}
//#endregion

    /*Highcharts: typeof Highcharts = Highcharts;
    screenedbygenderchartOptions: Highcharts.Options = {
        title: {
            text: 'Screnned by Gender',
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
                        //Compile Male Positivity
                        if ((dataInstance.AgeGroup == ageGroupInstance) && (dataInstance.Gender == "Female")) {
                            this.ScreeningByAgeGenderSeries[1].push(dataInstance.Screened);
                        }

                        //Compile Female Positivity
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

    /*screeningbyageandgenderchartOptions: Highcharts.Options = {

        title: {
            text: 'Screened by age & Gender',
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




    };*/
     //#region Load Chart --> Screening by Facility
     loadScreeningByFacilityData() {
        this.reviewService.findScreeningByFacility().subscribe(
            response => {
                this.ScreeningByFacility = response;

                //#region Init series indexes
                // Facilities (Index --> 0)
                this.ScreeningByFacilitySeries.push([]);

                //Screening (Index --> 1)
                this.ScreeningByFacilitySeries.push([]);
                //#endregion

                //#region Push series data into array at specific indexes
                this.ScreeningByFacility.forEach(dataInstance => {
                    //Compile Facilities
                    this.ScreeningByFacilitySeries[0].push(dataInstance.Facility);

                    //Compile Screenings
                    this.ScreeningByFacilitySeries[1].push(dataInstance.Screened);
                });
                //#endregion

                this.loadScreeningByFacilityChart();
            });
    }

    loadScreeningByFacilityChart() {
        this.screenedbyhealthfacilitieschartOptions = {
           
            title: {
                text: 'Screening by Facility',
                align: 'left'
            },
            chart: {
                type: 'column'
            },
            xAxis: {
                categories: ['Kenyatta National Hospital', 'Busia CRH', 'Marsabit CRH', 'Machakos CRH']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number Screened'
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
                backgroundColor:'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
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
                name: 'Enrolled',
                data: [3, 5, 1, 13],
                color:'#234FEA'
            }, {
                name: 'Positive',
                data: [14, 8, 8, 12],
                color:'#FF0000'
            },
        ] 






        };
    }
    //#endregion
    /*
    screenedbyhealthfacilitieschartOptions: Highcharts.Options = {

        title: {
            text: 'No screened at different health facilities',
            align: 'left'
        },
        chart: {
            type: "column",
        },
        // title: {
        // 	text: "Screening Cascade",
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
    /*
    screenedovertimechartOptions: Highcharts.Options = {

        chart: {
            //zoomType: 'xy'
        },
        title: {
            text: 'Screened over time',
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
    };*/

    Highcharts: typeof Highcharts = Highcharts;








}

