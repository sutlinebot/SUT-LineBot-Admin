import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css']
})
export class RadarChartComponent implements OnInit {
  public radarChartLabels = Array.from(Array(10).keys());
  public radarChartData = [
    {data: Array.from(Array(10).keys()), label: 'success'},
    {data: Array.from(Array(10).keys()), label: 'fail'}
  ];
  failrate = 0;
  successrate = 0;
  public radarChartType = 'radar';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loaddata();
  }

  loaddata() {
    this.http.get('https://sut-line-bot.herokuapp.com/getcount').subscribe((data: any) => {
      this.radarChartLabels = data.Labels;
      this.radarChartData[0].data = data.success;
      this.radarChartData[1].data = data.fail;
      this.failrate = Number(((data.sumfail / (data.sumfail + data.sumsuccess)) * 100).toFixed(2));
      this.successrate = Number(((data.sumsuccess / (data.sumfail + data.sumsuccess)) * 100).toFixed(2));
    });
  }

}
