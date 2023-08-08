import { ReviewService } from './../../services/review.service.ts.service';
import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { Covid19ResultsByStatus } from 'src/app/models/covid19ResultsByStatus.model';
import { Covid19ResultsByFacility } from 'src/app/models/covid19ResultsByFacility.model';

@Component({
    selector: 'app-covid19results',
    templateUrl: './covid19results.component.html',
    styleUrls: ['./covid19results.component.css']
})

export class Covid19resultsComponent {
    //#region Prerequisites --> Covid-19 Results by Status
    covid19ResultsByStatus: Covid19ResultsByStatus[] = [];
    covid19ResultsByStatusSeries: any[] = [];
    covid19ResultsByStatusOptions: {} = {};
    //#endregion

    //#region Prerequisites --> Covid-19 Results by Facility
    covid19ResultsByFacility: Covid19ResultsByFacility[] = [];
    covid19ResultsByFacilitySeries: any[][] = [];
    covid19ResultsByFacilityOptions: {} = {};
    //#endregion

    constructor(private reviewService: ReviewService,) {
        //this.loadOverallPositivity();
    }

    ngOnInit() {
        this.loadCovid19ResultsByStatusData();
        this.loadCovid19ResultsByStatusChart();

        this.loadCovid19ResultsByFacilityData();
        this.loadCovid19ResultsByFacilityChart();
    }

    //#region Load Chart --> Covid-19 Results by Status
    loadCovid19ResultsByStatusData() {
        this.reviewService.findCovid19ResultsByStatus().subscribe(
            response => {
                this.covid19ResultsByStatus = response;

                //#region Push series data into array at specific indexes
                this.covid19ResultsByStatus.forEach(dataInstance => {
                    // Covid-19 Positive (Index --> 0)
                    this.covid19ResultsByStatusSeries.push(dataInstance.Covid19Positive);

                    // Covid-19 Negative (Index --> 1)
                    this.covid19ResultsByStatusSeries.push(dataInstance.Covid19Negative);
                });
                //#endregion

                this.loadCovid19ResultsByStatusChart();
            });
    }

    loadCovid19ResultsByStatusChart() {
        this.covid19ResultsByStatusOptions = {
            title: {
                text: 'COVID-19 Results By Status',
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
                        ["Positive", this.covid19ResultsByStatusSeries[0]],
                        ["Negative", this.covid19ResultsByStatusSeries[1]]
                    ]
                }
            ],
            plotOptions: {
                pie: {
                    innerSize: "70%",
                    depth: 25,
                    dataLabels: {
                        enabled: true
                    },
                },
            }
        };

        HC_exporting(Highcharts);
    }
    //#endregion

    //#region Load Chart --> Covid-19 Results by Facility
    loadCovid19ResultsByFacilityData() {
        this.reviewService.findCovid19ResultsByFacility().subscribe(
            response => {
                this.covid19ResultsByFacility = response;

                //#region Init series indexes
                // Facilities (Index --> 0)
                this.covid19ResultsByFacilitySeries.push([]);

                //Enrolled (Index --> 1)
                this.covid19ResultsByFacilitySeries.push([]);

                //Enrolled(Positive) (Index --> 2)
                this.covid19ResultsByFacilitySeries.push([]);
                //#endregion

                //#region Push series data into array at specific indexes
                this.covid19ResultsByFacility.forEach(dataInstance => {
                    //Compile Facilities
                    this.covid19ResultsByFacilitySeries[0].push(dataInstance.Facility);

                    //Compile Enrolled
                    this.covid19ResultsByFacilitySeries[1].push(dataInstance.Enrolled);

                    //Compile Enrolled --> Positive
                    this.covid19ResultsByFacilitySeries[2].push(dataInstance.Covid19Positive);
                });
                //#endregion

                this.loadCovid19ResultsByFacilityChart();
            });
    }

    loadCovid19ResultsByFacilityChart() {
        this.covid19ResultsByFacilityOptions = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'COVID-19 Results By Facility',
                align: 'left'
            },
            xAxis: {
                categories: this.covid19ResultsByFacilitySeries[0]
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number Enrolled'
                },
                stackLabels: {
                    enabled: false
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
                name: 'Enrolled',
                data: this.covid19ResultsByFacilitySeries[2],
                type: 'column',
                color: 'blue'
            }, {
                name: 'Covid-19 Positive',
                data: this.covid19ResultsByFacilitySeries[1],
                type: 'column',
                color: '#008000'
            },]
        };

        HC_exporting(Highcharts);
    }
    //#endregion

    Highcharts: typeof Highcharts = Highcharts;

    covid19positivitybygenderchartOptions: Highcharts.Options = {
   
        chart: {
			type: "pie",
		},
		title: {
			text: "Enrollment By Sex",
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
     
        


    }




    covid19positivitybyageandgenderchartOptions: Highcharts.Options = {
   
        chart: { type: "bar" },
		title: { text: "Participant Distribution by Age, Sex" },
		xAxis: [
			{ categories: ["0-4 yrs","5-9 yrs","15-34 yrs"],
            title: { text: "" }, reversed: false },
			{
                categories: ["0-4 yrs","5-9 yrs","15-34 yrs"],
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
                //         return Math.abs(this.value).toString();
                //     },
                // },
            },
		],
		plotOptions: { series: { stacking: "normal" }, bar: { pointWidth: 18 } },
		tooltip: {
		},
		legend: { align: "left", verticalAlign: "top", y: 0, x: 80 },
		series: [
			{ name: "Female", 
            data: [10, 60, 30], 
            color: "blue",
            type: 'bar' 
        },
			{ name: "Male", 
            data: [-9, -41, -34], 
            color: "orange",
            type:'bar'
         },
		],
     
        





    }



}
