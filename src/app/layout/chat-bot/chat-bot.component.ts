import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../../chat.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';


@Component({
    selector: 'chat-bot',
    templateUrl: './chat-bot.component.html',
    styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {
    
    messages: Observable<Message[]>;
    formValue: string;
    constructor(public chat: ChatService) { }

    ngOnInit() {
        this.messages = this.chat.conversation.asObservable()
            .scan((acc, val) => acc.concat(val) );
    }

    sendMessage() {
        this.chat.converse(this.formValue);
        this.formValue = '';
      }

}
