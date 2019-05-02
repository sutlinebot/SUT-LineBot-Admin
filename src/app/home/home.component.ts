import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from '@angular/fire/database';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { DialogflowService } from '../shared/api/dialogflow.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  questionsRef: AngularFireList<any>;
  questions: any[];

  intents: any;
  fullIntents;
  constructor(public db: AngularFireDatabase, private myapi: DialogflowService, private http: HttpClient) {
    this.questionsRef = db.list('question');

  }
  ngOnInit() {
    this.questionsRef.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, value: action.payload.val() }));
    }).subscribe(items => {
      this.questions = items;
      console.log(this.questions);
      
    });

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

  assignIntent(word,wordKey ,intentsID) {
    this.myapi.getDetailIntent(intentsID).subscribe(
      data => {
        console.log("GET Request is successful ", data);
        this.fullIntents = data;
        delete this.fullIntents.followupIntentInfo;
        this.fullIntents.trainingPhrases.push(
          {
            "type": "EXAMPLE",
            "parts": [
              {
                "text": word
              }
            ]
          }
        )
        this.myapi.patchIntent(intentsID, this.fullIntents).subscribe(
          data => {
            console.log("PATCH is successful ", data);
            this.questionsRef.remove(wordKey);
          },
          error => {
            console.log("Error", error);
            //alert("ผิดพลาด " + error)
          }
        )

      },
      error => {
        console.log("Error", error);
        //alert("ผิดพลาด " + error)
      }
    );

  }
}
