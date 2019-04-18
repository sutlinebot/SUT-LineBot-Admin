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

  getIntentList(){
    const token = document.cookie.split('=')[2];
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + token});
    return this.http.get('https://dialogflow.googleapis.com/v2/projects/botframe-2d07e/agent/intents' , {headers: httpHeaders});
  }

  addIntent(myform:NgForm){
    const token = document.cookie.split('=')[2];
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + token});
    return this.http.post('https://dialogflow.googleapis.com/v2/projects/botframe-2d07e/agent/intents',myform , {headers: httpHeaders});
  }

  deleteIntent(intentId:string){
    //console.log('https://dialogflow.googleapis.com/v2/'+intentId)
    const token = document.cookie.split('=')[2];
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + token});
    return this.http.delete('https://dialogflow.googleapis.com/v2/'+intentId , {headers: httpHeaders});
  }
}
