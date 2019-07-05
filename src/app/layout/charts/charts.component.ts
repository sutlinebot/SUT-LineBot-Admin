import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Label, Color } from 'ng2-charts';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService

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
      public barChartColors: Color[] = [
        { backgroundColor:  'skyblue', borderColor: 'dodgerblue',  borderWidth: 2},
        { backgroundColor: '#F08080',  borderColor: 'firebrick',  borderWidth: 2},
      ];
      public chartData = [
        {data: Array.from(Array(10).keys()), label: 'success'},
        {data: Array.from(Array(10).keys()), label: 'fail'},
      ];
      failrate = 0;
      successrate = 0;

      constructor(private http: HttpClient,private ngxService: NgxUiLoaderService) { }

    // Doughnut
    public successChartData = Array.from(Array(10).keys());
    public failChartData = Array.from(Array(10).keys());
    public doughnutChartType = 'doughnut';

    // Radar
    // นับจำนวนที่ส่งมาทั้งหมด
      public radarChartType = 'radar';
      public countData = [ {data: Array.from(Array(10).keys()), label: 'จำนวนครั้งที่ส่ง'} ];
      public raderColors: Color[] = [
        { backgroundColor: 'rgba(105, 0, 132, .2)', borderColor: 'rgba(200, 99, 132, .7)', borderWidth: 2 },
      ];
    // Pie

    public pieChartType = 'pie';
    public percentSuccess = Array.from(Array(10).keys());
    public pieColors: Color[] = [
      { backgroundColor:   ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']},
    ];


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

    public lineChartLegend: boolean;
    public lineChartType: string;

    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    public getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    ngOnInit() {
        this.barChartLegend = true;
        this.polarAreaLegend = true;
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.loaddata(); 
    }
    loaddata() {
      this.ngxService.start();
      setTimeout(() => {
        this.http.get('https://sut-line-bot.herokuapp.com/getcount').subscribe((data: any) => {
          this.Labels = data.Labels;
          this.chartData[0].data = data.success;
          this.chartData[1].data = data.fail;
          this.successChartData = data.success;
          this.failChartData = data.fail;
          this.failrate = Number(((data.sumfail / (data.sumfail + data.sumsuccess)) * 100).toFixed(2));
          this.successrate = Number(((data.sumsuccess / (data.sumfail + data.sumsuccess)) * 100).toFixed(2));
          const sumcount = []; // fail + success
          const percentSuccessTemp = []; //
          const color = [];
          data.success.forEach((item, index) => {
            sumcount[index] = item + data.fail[index];
            percentSuccessTemp[index] = Number((item / sumcount[index]) * 100).toFixed(2);
            color[index] = this.getRandomColor();
          });
          this.countData[0].data = sumcount;
          this.percentSuccess = percentSuccessTemp;
          this.pieColors[0].backgroundColor = color;
          this.ngxService.stop();
        },err => {
          this.ngxService.stop();
        });
      }, 500);
      }
}
