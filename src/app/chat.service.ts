import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';
import { Time } from '@angular/common';

export class Message {
  constructor(public content: string, public sentBy: string,public photoUrl: string,public time: string,public name: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({ accessToken: this.token });

  conversation = new BehaviorSubject<Message[]>([]);

  constructor(private http: HttpClient) { }

  // Sends and receives messages via DialogFlow
  converse(msg: string) {
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const userMessage = new Message(msg, 'user',localStorage.getItem('photoUrl'),time,localStorage.getItem('userName'));
    this.update(userMessage);

    return this.client.textRequest(msg)
               .then(res => {
                  const today = new Date();
                  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                  const speech = res.result.fulfillment.speech;
                  const botMessage = new Message(speech, 'bot','https://upload.wikimedia.org/wikipedia/th/thumb/3/33/Sut_logo_Thai.svg/180px-Sut_logo_Thai.svg.png',time,'SUT-ChatBot');
                  this.update(botMessage);
               });
  }
  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }

}
