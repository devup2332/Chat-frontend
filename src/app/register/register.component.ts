import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthUserService } from '../shared/services/auth-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authSrv: AuthUserService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = new FormGroup(
      {
        first_name: new FormControl('', Validators.required),
        last_name: new FormControl('', Validators.required),
        email: new FormControl(
          '',
          [Validators.required, Validators.pattern(environment.emailPatt)],
          this.authSrv._validate_email()
        ),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern(environment.numberPatt),
        ]),
        password: new FormControl('', Validators.required),
        password_2: new FormControl(''),
      },
      {
        validators: this.authSrv._check_passwords('password', 'password_2'),
      }
    );
  }

  register_user(new_user: any) {
    if (this.registerForm.invalid) {
      return Object.values(this.registerForm.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    }
    this.authSrv._register_user(new_user).subscribe((res) => {
      console.log(res);
    });
  }

  get name1Req() {
    return (
      this.registerForm.get('first_name')?.hasError('required') &&
      (this.registerForm.get('first_name')?.touched ||
        this.registerForm.get('first_name')?.dirty)
    );
  }

  get name2Req() {
    return (
      this.registerForm.get('last_name')?.hasError('required') &&
      (this.registerForm.get('last_name')?.touched ||
        this.registerForm.get('last_name')?.dirty)
    );
  }

  get emailReq() {
    return (
      this.registerForm.get('email')?.hasError('required') &&
      (this.registerForm.get('email')?.touched ||
        this.registerForm.get('email')?.dirty)
    );
  }

  get emailInvalid() {
    return this.registerForm.get('email')?.hasError('pattern');
  }

  get alreadyEmail() {
    return this.registerForm.get('email')?.hasError('exist');
  }

  get phoneReq() {
    return (
      this.registerForm.get('phone')?.hasError('required') &&
      (this.registerForm.get('phone')?.touched ||
        this.registerForm.get('phone')?.dirty)
    );
  }

  get phoneInvalid() {
    return this.registerForm.get('phone')?.hasError('pattern');
  }

  get passReq() {
    return (
      this.registerForm.get('password')?.hasError('required') &&
      (this.registerForm.get('password')?.touched ||
        this.registerForm.get('password')?.dirty)
    );
  }

  get passwordIsNotEqual() {
    return (
      this.registerForm.hasError('notEqual') &&
      (this.registerForm.get('password_2')?.touched ||
        this.registerForm.get('password_2')?.dirty)
    );
  }
}
