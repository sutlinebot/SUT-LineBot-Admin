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
                 console.log(res)
                  const today = new Date();
                  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                  const speech = res.result.fulfillment.speech;
                  const botMessage = new Message(speech, 'bot','https://scontent.fbkk5-3.fna.fbcdn.net/v/t1.0-9/57388262_1990174661112235_3199573420874399744_n.jpg?_nc_cat=105&_nc_oc=AQlNovsVIJKw_SY2kHhcDyW0vKk6y7qJbqtbR7FUTcAI1KAa9pgjml9EPFhlEpWhRX-k0gpxeet2Gbwcsx6WVFxn&_nc_ht=scontent.fbkk5-3.fna&oh=173ab731a81251bed69c7787b6f1aec8&oe=5D8BCD2C',time,'SUT-ChatBot');
                  this.update(botMessage);
               });
  }
  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }

}
