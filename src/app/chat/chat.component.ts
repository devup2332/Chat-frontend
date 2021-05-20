import { Component, OnInit } from '@angular/core';

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

  match: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.match = this.devices.some((device) => {
      return navigator.userAgent.match(device);
    });
  }
}
