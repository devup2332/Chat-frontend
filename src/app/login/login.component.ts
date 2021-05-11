import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthUserService } from '../shared/services/auth-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthUserService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(environment.emailPatt),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  loginUser(credentials: any): void {
    if (this.loginForm.invalid) {
      return Object.values(this.loginForm.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }

    this.authService._login_user(credentials).subscribe((data) => {
      console.log(data);
    });
  }

  get reqEmail() {
    return (
      this.loginForm.get('email')?.hasError('required') &&
      (this.loginForm.get('email')?.touched ||
        this.loginForm.get('email')?.dirty)
    );
  }

  get invalidEmail() {
    return (
      this.loginForm.get('email')?.hasError('pattern') &&
      this.loginForm.get('email')?.touched
    );
  }

  get reqPass() {
    return (
      this.loginForm.get('password')?.hasError('required') &&
      (this.loginForm.get('password')?.touched ||
        this.loginForm.get('password')?.dirty)
    );
  }
}
