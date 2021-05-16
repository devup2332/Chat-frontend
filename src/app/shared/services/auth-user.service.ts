import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  constructor(private http: HttpClient) {}

  _login_user(credentials: any) {
    console.log(credentials);
    return this.http.post(
      `${environment.backend_uri}api/auth/login`,
      credentials
    );
  }

  _check_passwords(
    controlName: string,
    matchingControlName: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pass1 = control.get(controlName)?.value;
      const pass2 = control.get(matchingControlName)?.value;

      return pass1 === pass2
        ? null
        : {
            notEqual: true,
          };
    };
  }

  _register_user(credentials: any) {
    return this.http.post(
      `${environment.backend_uri}api/auth/register`,
      credentials
    );
  }
}
