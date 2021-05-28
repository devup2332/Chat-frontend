import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
  user: any;
  @Input('chat') chat: any;
  @Output() newMessage = new EventEmitter<string>();
  @ViewChild('bubbles', { static: false }) bubbles: ElementRef<HTMLDivElement>;

  constructor(
    private _chatSrv: ChatServiceService,
    private _pusherSrv: PusherService
  ) {}

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      message: new FormControl('', Validators.required),
    });

    this._pusherSrv.channel.bind('login-user', async () => {
      if (this.chat) {
        console.log('User login now');
        this.chat = await this._chatSrv._getChat(this.chat.id);
        console.log(this.chat);
      }
    });

    this._pusherSrv.channel.bind('logout-user', async () => {
      if (this.chat) {
        console.log('User is logout');
        this.chat = await this._chatSrv._getChat(this.chat.id);
      }
    });

    this._pusherSrv.channel.bind('new-message-user', (data: any) => {
      console.log('new message');

      this.chat?.messages.push(data?.message);

      this.newMessage.emit(data?.message?.message);
      this.bubbles.nativeElement.scroll({
        top: this.bubbles.nativeElement.scrollHeight + 300,
        left: 0,
      });
    });
  }

  ngOnDestroy() {
    this._pusherSrv.channel.unbind_all();
  }

  async setChat(id: number, user: any) {
    this.chat = await this._chatSrv._getChat(id);
    this.user = user;
    this.bubbles.nativeElement.scrollTo({
      top: 500000,
      left: 0,
    });
  }

  async sendMessage(message: any) {
    if (this.messageForm.invalid) {
      return;
    }
    await this._chatSrv._sendMesage(message, this.chat?.id);
    const h = this.bubbles.nativeElement.scrollHeight;
    this.bubbles.nativeElement.scrollTo({
      top: h,
      left: 0,
    });
    this.messageForm.reset();
  }
}
