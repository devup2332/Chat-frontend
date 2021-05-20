import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  constructor(private http: HttpClient) {}

  _login_user(credentials: any) {
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

  _validate_email() {
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      const email = control.value;
      return this.http
        .get(`${environment.backend_uri}api/auth/validate-email/${email}`)
        .pipe(
          map((res: any) => {
            if (res.status) {
              return null;
            }

            return {
              exist: true,
            };
          })
        );
    };
  }
}
