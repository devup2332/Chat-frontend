import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { NoDesktopComponent } from './components/no-desktop/no-desktop.component';

@NgModule({
  declarations: [
    ChatComponent,
    NoDesktopComponent
  ],
  imports: [CommonModule, ChatRoutingModule],
})
export class ChatModule {}
