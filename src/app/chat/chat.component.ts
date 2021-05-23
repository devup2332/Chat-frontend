import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { chats } from '../../../data';
import { AuthUserService } from '../shared/services/auth-user.service';

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

  user: any;

  chats: any[];

  match: boolean = false;
  constructor(private router: Router, private _authSrv: AuthUserService) {}

  ngOnInit(): void {
    this.match = this.devices.some((device) => {
      return navigator.userAgent.match(device);
    });

    this.chats = chats;

    this.getUserLogged();
  }

  switchTheme(toggle: HTMLDivElement) {
    toggle.classList.toggle('active');
  }

  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.router.navigate(['/login']);
  }

  async getUserLogged() {
    const user = await this._authSrv._getUserLogged();
    this.user = user;
    console.log(this.user);

    if (!user) {
      const token = await this._authSrv._refreshToken();
      localStorage.setItem('access', token.access);
      localStorage.setItem('access', token.refresh);
    }
  }
}
