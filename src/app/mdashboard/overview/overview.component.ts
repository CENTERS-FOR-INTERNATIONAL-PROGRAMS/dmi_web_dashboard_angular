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
    title:{
      text:'Overall COVID-19 Positivity',
    },
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
 // Highcharts.chart('container', {
  positivitybysexandagechartOptions: Highcharts.Options= {
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
        tooltip: {
            valueSuffix: '°C'
        }
    }]
};
  //  positivitybysexandagechartOptions: Highcharts.Options = {
  //   title:{
  //     text:'COVID-19 positivity by Age, Sex',
  //   },
  //   series: [{
  //     data: [1, 2, 3],
  //     type: 'line'
  //   }]
  // };
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

