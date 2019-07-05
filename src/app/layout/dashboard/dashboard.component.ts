import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Label, Color } from 'ng2-charts';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from '@angular/fire/database';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {

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
      questionsRef: AngularFireList<any>;
      questions: any[];
      alert;

    constructor(private http: HttpClient,private ngxService: NgxUiLoaderService,public db: AngularFireDatabase,) {
        this.questionsRef = db.list('question');
    }

    ngOnInit() {
        this.loaddata();
        this.questionsRef.snapshotChanges().map(actions => {
            return actions.map(action => ({ key: action.key, value: action.payload.val() }));
          }).subscribe(items => {
            this.questions = items;
            this.alert = this.questions.length;
          });
    }

    loaddata() {
        this.ngxService.start();
        setTimeout(() => {
          this.http.get('https://sut-line-bot.herokuapp.com/getcount').subscribe((data: any) => {
            this.Labels = data.Labels;
            this.chartData[0].data = data.success;
            this.chartData[1].data = data.fail;
            this.failrate = Number(((data.sumfail / (data.sumfail + data.sumsuccess)) * 100).toFixed(2));
            this.successrate = Number(((data.sumsuccess / (data.sumfail + data.sumsuccess)) * 100).toFixed(2));
            const sumcount = []; // fail + success
            const percentSuccessTemp = []; //
            const color = [];
            this.ngxService.stop();
          },err => {
            this.ngxService.stop();
          });
        }, 500);
        }
}
