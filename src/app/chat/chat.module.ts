import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { NoDesktopComponent } from './components/no-desktop/no-desktop.component';
import { NoChatComponent } from './components/no-chat/no-chat.component';
import { YesChatComponent } from './components/yes-chat/yes-chat.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ChatComponent,
    NoDesktopComponent,
    NoChatComponent,
    YesChatComponent,
  ],
  imports: [CommonModule, ChatRoutingModule, SharedModule],
})
export class ChatModule {}
