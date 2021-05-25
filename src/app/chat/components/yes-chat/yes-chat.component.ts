import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from 'src/app/shared/services/chat-service.service';

@Component({
  selector: 'app-yes-chat',
  templateUrl: './yes-chat.component.html',
  styleUrls: ['./yes-chat.component.scss'],
})
export class YesChatComponent implements OnInit {
  chat: any;
  user: any;

  constructor(private _chatSrv: ChatServiceService) {}

  ngOnInit(): void {}

  async setChat(id: number, user: any) {
    this.chat = await this._chatSrv._getChat(id);
    this.user = user;
  }
}
