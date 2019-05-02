import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from '@angular/fire/database';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { DialogflowService } from '../shared/api/dialogflow.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intent',
  templateUrl: './intent.component.html',
  styleUrls: ['./intent.component.css']
})


export class IntentComponent implements OnInit {

  displayColumns: string[] = ['name', 'displayName'];
  dataSource: any;
  list;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public db: AngularFireDatabase, private myapi: DialogflowService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    if (this.isLogin()) {
      this.router.navigate(['/login']);
    }

    this.getintentList();
  }

  isLogin(){
    const token = document.cookie.split('=')[2];
    if(token != null) {
      return false;
    }
    return true;
  }

  getintentList() {
    this.myapi.getIntentList().subscribe(data => {
      this.list = data;
      const intentList: IntentList[] = [];
      
      for (let index = 0; index < this.list["length"]; index++) {
        intentList.push({
          name: this.list[index].name,
          displayName: this.list[index].displayName
        });
      }

      this.dataSource = new MatTableDataSource(intentList);
      this.dataSource.paginator = this.paginator;

    });
    console.log(this.dataSource);
  }

}

export interface IntentList {
  name: string;
  displayName: string;
}
