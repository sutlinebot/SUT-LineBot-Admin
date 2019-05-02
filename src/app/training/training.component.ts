import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from '@angular/fire/database';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { DialogflowService } from '../shared/api/dialogflow.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  questionsRef: AngularFireList<any>;
  questions: any[];

  intents;
  fullIntents;
  constructor(public db: AngularFireDatabase, private myapi: DialogflowService, private http: HttpClient, private router: Router) {
    this.questionsRef = db.list('question');

  }


  ngOnInit() {
    if (this.isLogin()) {
      this.router.navigate(['/login']);
    }
    
    this.questionsRef.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, value: action.payload.val() }));
    }).subscribe(items => {
      this.questions = items;
      console.log(this.questions);
      
    });

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
    this.myapi.getIntentList().subscribe((data: any) => {
      this.intents = data.intents;
      this.intents
        .map((cur, index, arr) => {
          this.intents[index] = [cur.displayName, cur.name]
        });
    });
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
