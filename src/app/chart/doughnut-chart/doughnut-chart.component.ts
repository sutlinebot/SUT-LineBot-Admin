import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {
  public Labels = Array.from(Array(10).keys());
  public successChartData = Array.from(Array(10).keys());
  public failChartData = Array.from(Array(10).keys());
  public doughnutChartType = 'doughnut';
  failrate = 0;
  successrate = 0;
  constructor(private http: HttpClient) {
   }

  ngOnInit() {
    this.loaddata();
  }
  loaddata() {
    this.http.get('https://sut-line-bot.herokuapp.com/getcount').subscribe((data: any) => {
        this.Labels = data.Labels;
        this.successChartData = data.success;
        this.failChartData = data.fail;
        this.failrate = Number(((data.sumfail / (data.sumfail + data.sumsuccess)) * 100).toFixed(2));
        this.successrate = Number(((data.sumsuccess / (data.sumfail + data.sumsuccess)) * 100).toFixed(2));
      });
  }

}
