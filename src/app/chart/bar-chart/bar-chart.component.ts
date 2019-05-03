import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = Array.from(Array(10).keys());
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: Array.from(Array(10).keys()), label: 'success'},
    {data: Array.from(Array(10).keys()), label: 'fail'}
  ];
  failrate = 0;
  successrate = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loaddata();
  }

  loaddata() {
    this.http.get('https://sut-line-bot.herokuapp.com/getcount').subscribe((data: any) => {
      this.barChartLabels = data.Labels;
      this.barChartData[0]['data'] = data.success;
      this.barChartData[1]['data'] = data.fail;
      this.failrate = Number(((data.sumfail / (data.sumfail + data.sumsuccess)) * 100).toFixed(2));
      this.successrate = Number(((data.sumsuccess / (data.sumfail + data.sumsuccess)) * 100).toFixed(2));
    });
  }

}
