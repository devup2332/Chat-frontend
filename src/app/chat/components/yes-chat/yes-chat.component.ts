import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatServiceService } from 'src/app/shared/services/chat-service.service';
import { PusherService } from 'src/app/shared/services/pusher.service';

@Component({
  selector: 'app-yes-chat',
  templateUrl: './yes-chat.component.html',
  styleUrls: ['./yes-chat.component.scss'],
})
export class YesChatComponent implements OnInit, OnDestroy {
  messageForm: FormGroup;
  chat: any;
  user: any;

  constructor(
    private _chatSrv: ChatServiceService,
    private pusherSrv: PusherService
  ) {}

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      message: new FormControl('', Validators.required),
    });

    this.pusherSrv.channel.bind('login-user', async () => {
      if (this.chat) {
        console.log('User login now');
        this.chat = await this._chatSrv._getChat(this.chat.id);
      }
    });

    this.pusherSrv.channel.bind('logout-user', async () => {
      if (this.chat) {
        console.log('User is logout');
        this.chat = await this._chatSrv._getChat(this.chat.id);
      }
    });
  }

  ngOnDestroy() {
    this.pusherSrv.channel.unbind_all();
  }

  async setChat(id: number, user: any) {
    this.chat = await this._chatSrv._getChat(id);
    this.user = user;
  }

  sendMessage(message: any) {
    if (this.messageForm.invalid) {
      return;
    }
    console.log(message);
    this.messageForm.reset();
  }
}
