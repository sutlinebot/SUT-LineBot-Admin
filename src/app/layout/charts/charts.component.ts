import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    animations: [routerTransition()]
})
export class ChartsComponent implements OnInit {
    // bar
    public barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
      };
      public Labels = Array.from(Array(10).keys());
      public barChartType = 'bar';
      public barChartLegend = true;
      public chartData = [
        {data: Array.from(Array(10).keys()), label: 'success'},
        {data: Array.from(Array(10).keys()), label: 'fail'}
      ];
      failrate = 0;
      successrate = 0;

      constructor(private http: HttpClient) { }

    // Doughnut
    public successChartData = Array.from(Array(10).keys());
    public failChartData = Array.from(Array(10).keys());
    public doughnutChartType = 'doughnut';

    // Radar
      public radarChartType = 'radar';

    // Pie

    public pieChartType = 'pie';


    // PolarArea
    public polarAreaChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail Sales',
        'Telesales',
        'Corporate Sales'
    ];

    public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
    public polarAreaLegend: boolean;

    public polarAreaChartType: 'polarArea';

    public lineChartOptions: any = {
        responsive: true
    };
    // public lineChartColors: Array<any> = [
    //     {
    //         // grey
    //         backgroundColor: 'rgba(148,159,177,0.2)',
    //         borderColor: 'rgba(148,159,177,1)',
    //         pointBackgroundColor: 'rgba(148,159,177,1)',
    //         pointBorderColor: '#fff',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    //     },
    //     {
    //         // dark grey
    //         backgroundColor: 'rgba(77,83,96,0.2)',
    //         borderColor: 'rgba(77,83,96,1)',
    //         pointBackgroundColor: 'rgba(77,83,96,1)',
    //         pointBorderColor: '#fff',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: 'rgba(77,83,96,1)'
    //     },
    //     {
    //         // grey
    //         backgroundColor: 'rgba(148,159,177,0.2)',
    //         borderColor: 'rgba(148,159,177,1)',
    //         pointBackgroundColor: 'rgba(148,159,177,1)',
    //         pointBorderColor: '#fff',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    //     }
    // ];
    public lineChartLegend: boolean;
    public lineChartType: string;

    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    // public randomize(): void {
    //     // Only Change 3 values
    //     const data = [
    //         Math.round(Math.random() * 100),
    //         59,
    //         80,
    //         Math.random() * 100,
    //         56,
    //         Math.random() * 100,
    //         40
    //     ];
    //     const clone = JSON.parse(JSON.stringify(this.barChartData));
    //     clone[0].data = data;
    //     this.barChartData = clone;
    //     /**
    //      * (My guess), for Angular to recognize the change in the dataset
    //      * it has to change the dataset variable directly,
    //      * so one way around it, is to clone the data, change it and then
    //      * assign it;
    //      */
    // }
    ngOnInit() {
        this.barChartLegend = true;
        this.polarAreaLegend = true;
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.loaddata();
    }
    loaddata() {
        this.http.get('https://sut-line-bot.herokuapp.com/getcount').subscribe((data: any) => {
          this.Labels = data.Labels;
          this.chartData[0].data = data.success;
          this.chartData[1].data = data.fail;
          this.successChartData = data.success;
          this.failChartData = data.fail;
          this.failrate = Number(((data.sumfail / (data.sumfail + data.sumsuccess)) * 100).toFixed(2));
          this.successrate = Number(((data.sumsuccess / (data.sumfail + data.sumsuccess)) * 100).toFixed(2));
        });
      }
}
