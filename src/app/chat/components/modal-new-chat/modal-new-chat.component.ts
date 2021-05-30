import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-new-chat',
  templateUrl: './modal-new-chat.component.html',
  styleUrls: ['./modal-new-chat.component.scss'],
})
export class ModalNewChatComponent implements OnInit {
  newChatForm: FormGroup;

  @Input() modalActive: undefined | boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.newChatForm = new FormGroup({
      search: new FormControl('', [Validators.required]),
    });
  }

  closeModal(e: Event) {
    const modal = document.querySelector<HTMLDivElement>(
      '.new-chat-modal-container.visible'
    );
    const calcelBtn = document.querySelector<HTMLDivElement>('.cancel-btn');
    if (e.target === modal) {
      this.modalActive = false;
      this.newChatForm.get('search')?.reset();
      return;
    }

    if (e.target === calcelBtn) {
      this.modalActive = false;
      this.newChatForm.get('search')?.reset();
      return;
    }
  }
}
