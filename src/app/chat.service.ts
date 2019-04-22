import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Message {
  constructor(public content: string, public sentBy: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // readonly token = environment.dialogflow.angularBot;
  // readonly client = new ApiAiClient({ accessToken: this.token });

  conversation = new BehaviorSubject<Message[]>([]);

  constructor(private http: HttpClient) { }

  // Sends and receives messages via DialogFlow
  converse(msg: string) {
    const token = document.cookie.split('=')[3];
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + token});
    const data = {
      queryInput: {
        text: {
          languageCode: 'th',
          text: msg
        }
      }
    };
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);

    return this.http.post('https://dialogflow.googleapis.com/v2/projects/botframe-2d07e/agent/sessions/my_session_id:detectIntent'
    , data, {headers: httpHeaders});
  }
  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }

}
