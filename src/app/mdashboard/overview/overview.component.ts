import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  Highcharts: typeof Highcharts = Highcharts;
  overallpositivitychartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'pie'
    }]
  };
  ageCategories = [
		"0-4 yrs",
		"5-9 yrs",
		"15-34 yrs",
	];
	// positivitybysexandagechartOptions: Highcharts.Options= {
	// 	chart: { type: "bar" },
	// 	title: { text: "Participant Distribution by Age, Sex" },
	
	// 	yAxis: [
	// 	],
	// 	plotOptions: { series: { stacking: "normal" }, bar: { pointWidth: 18 } },
	// 	tooltip: {
	// 	},
	// 	legend: { align: "left", verticalAlign: "top", y: 0, x: 80 },
  //   series: [{
  //     data: [1, 2, 3],
  //     type: 'bar'
  //   }]
	// };
   positivitybysexandagechartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'line'
    }]
  };
  enrolledandtestedchartOptions: Highcharts.Options ={
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Number enrolled and tested COVID-19 positive',
        align: 'left'
    },
    // subtitle: {
    //     text: 'Source: <a ' +
    //         'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
    //         'target="_blank">Wikipedia.org</a>',
    //     align: 'left'
    // },
    xAxis: {
        categories: ['Busia CRH', 'Nakuru Level 6', 'Kapenguria', 'Loitoktok'],
        title: {
            text: null
        },
        gridLineWidth: 1,
        lineWidth: 0
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Cases',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        },
        gridLineWidth: 0
    },
    // tooltip: {
    //     valueSuffix: ' millions'
    // },
    plotOptions: {
        bar: {
            borderRadius: '50%',
            dataLabels: {
                enabled: true
            },
            groupPadding: 0.1
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Total Enrolled',
        data: [631, 727, 3202, 721],
        type: 'bar'
    }, {
        name: 'Covid-19 Positive',
        data: [814, 841, 3714, 726],
        type: 'bar'
    }] 
};

}

