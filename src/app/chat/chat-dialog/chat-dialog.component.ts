import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../../chat.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;
  constructor(public chat: ChatService) { }

  ngOnInit() {
    this.messages = this.chat.conversation.asObservable()
        .scan((acc, val) => acc.concat(val) );
  }

  sendMessage() {
    console.log(this.formValue);
    // console.log(data.queryResult.fulfillmentText);
    this.chat.converse(this.formValue).subscribe((data: any) => {
    const botMessage = new Message(data.queryResult.fulfillmentText, 'bot');
    this.chat.update(botMessage);
    });
    this.formValue = '';
  }

}
