import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DialogflowService {

  // public  token = document.cookie;
  // public httpHeaders = new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + this.token.split('=')[2]})

  constructor(private http: HttpClient) { }
  token = document.cookie.split('=')[2];
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + this.token});
  getIntentList() {
    // const token = document.cookie.split('=')[3];
    // const httpHeaders = new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + token});
    return this.http.get('https://dialogflow.googleapis.com/v2/projects/botframe-2d07e/agent/intents' , {headers: this.httpHeaders});
  }

  getDetailIntent(intentsID) {
    let url = 'https://dialogflow.googleapis.com/v2/' + intentsID + '?intentView=INTENT_VIEW_FULL';
    return this.http.get(url , {headers: new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + this.token })});
  }

  patchIntent(intentsID, json) {
    console.log(json);

    let url = 'https://dialogflow.googleapis.com/v2/' + intentsID ;
    return this.http.patch(url , json, {headers: this.httpHeaders});
  }

  addIntent(myform: NgForm) {
    // const token = document.cookie.split('=')[3];
    // const httpHeaders = new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + token});
    return this.http.post('https://dialogflow.googleapis.com/v2/projects/botframe-2d07e/agent/intents', myform
    , {headers: this.httpHeaders});
  }

  deleteIntent(intentId: string) {
    // console.log('https://dialogflow.googleapis.com/v2/'+intentId)
    // const token = document.cookie.split('=')[3];
    // const httpHeaders = new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + token});
    return this.http.delete('https://dialogflow.googleapis.com/v2/' + intentId , {headers: this.httpHeaders});
  }
}
