import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatBotRoutingModule } from './chat-bot-routing.module';
import { ChatBotComponent } from './chat-bot.component';
import { FormsModule } from '@angular/forms';
import { PageHeaderModule } from 'src/app/shared';

@NgModule({
    imports: [CommonModule, ChatBotRoutingModule, FormsModule,PageHeaderModule],
    declarations: [ChatBotComponent]
})
export class ChatBotModule {}
