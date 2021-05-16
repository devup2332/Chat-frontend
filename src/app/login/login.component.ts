import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SnackbarComponent } from '../shared/components/snackbar/snackbar.component';
import { AuthUserService } from '../shared/services/auth-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  timer: any;
  @ViewChild(SnackbarComponent) private snackbar: SnackbarComponent;

  constructor(private authService: AuthUserService) {}

  ngOnInit(): void {
    //Creating Form
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(environment.emailPatt),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  loginUser(credentials: any): void {
    //Seting inputs to touched
    if (this.loginForm.invalid) {
      return Object.values(this.loginForm.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }
    //Handle of res of backend
    this.authService._login_user(credentials).subscribe(
      (data: any) => {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
      },
      (err) => {
        if (this.timer) clearTimeout(this.timer);
        const message: string = err.error.message[0];
        this.snackbar.show(message);
        this.timer = setTimeout(() => {
          this.snackbar.close();
        }, 3000);
      }
    );
  }

  // Getters to handle messages of error in the form
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
