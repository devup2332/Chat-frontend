import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { chats } from '../../../data';
import { AuthUserService } from '../shared/services/auth-user.service';
import { ChatServiceService } from '../shared/services/chat-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  devices: RegExp[] = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  loading: boolean = true;
  theme: string | null;
  user: any;
  chats: any[];

  match: boolean = false;
  constructor(
    private router: Router,
    private _authSrv: AuthUserService,
    private _chatSrv: ChatServiceService
  ) {}

  async ngOnInit(): Promise<void> {
    this.theme = localStorage.getItem('theme');
    if (!this.theme) {
      this.theme = 'light-theme';
      localStorage.setItem('theme', 'light-theme');
    }
    if (this.theme === 'light-theme') {
      document.body.classList.add('light-theme');
    }

    if (this.theme === 'dark-theme') {
      document.body.classList.add('dark-theme');
    }
    this.loading = true;
    this.match = this.devices.some((device) => {
      return navigator.userAgent.match(device);
    });

    //Get data of user's chats

    this.chats = await this._chatSrv._getChats();

    await this.getUserLogged();

    this.loading = false;
  }

  switchTheme(toggle: HTMLDivElement) {
    toggle.classList.toggle('active');
    this.theme = localStorage.getItem('theme');
    if (this.theme === 'light-theme') {
      document.body.classList.remove(this.theme);
      this.theme = 'dark-theme';
      localStorage.setItem('theme', this.theme);
      document.body.classList.add(this.theme);
      return;
    }
    if (this.theme === 'dark-theme') {
      document.body.classList.remove(this.theme);
      this.theme = 'light-theme';
      localStorage.setItem('theme', this.theme);

      document.body.classList.add(this.theme);
    }
  }

  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.router.navigate(['/login']);
    console.log(this.theme);
    if (this.theme === 'dark-theme') {
      document.body.classList.remove('dark-theme');

      localStorage.setItem('theme', 'light-theme');
      document.body.classList.add('light-theme');
    }
  }

  async getUserLogged() {
    try {
      const user = await this._authSrv._getUserLogged();
      this.user = user;
      console.log(this.user);
    } catch (err) {
      if (err.status === 401) {
        const token = await this._authSrv._refreshToken();
        console.log(token.access);
        localStorage.setItem('access', token.access);
        this.user = await this._authSrv._getUserLogged();
      }
    }
  }

  get darkActive() {
    return this.theme === 'dark-theme';
  }
}
