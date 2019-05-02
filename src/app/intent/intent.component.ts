import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from '@angular/fire/database';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { DialogflowService } from '../shared/api/dialogflow.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-intent',
  templateUrl: './intent.component.html',
  styleUrls: ['./intent.component.css']
})
export class IntentComponent implements OnInit {

  intents;

  constructor(public db: AngularFireDatabase, private myapi: DialogflowService, private http: HttpClient) { }

  ngOnInit() {
    this.getintentList();
  }

  getintentList() {
    this.myapi.getIntentList().subscribe((data: any) => {
      this.intents = data.intents;
      this.intents
        .map((cur, index, arr) => {
          this.intents[index] = [cur.displayName, cur.name]
        });
    });
    console.log(this.intents);
  }
}
