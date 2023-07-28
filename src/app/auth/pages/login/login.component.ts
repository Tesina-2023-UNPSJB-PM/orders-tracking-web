import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SignInService } from '../../services/sign-in.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent {
  @Output() onLogin = new EventEmitter<boolean>();
  showMessageError = false;
  messageError = '';

  formLogin: FormGroup<{
    username: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  constructor(
    private formBuilder: FormBuilder,
    private signInService: SignInService
  ) {
    this.formLogin = formBuilder.group({
      username: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25),
      ]),
    });
  }

  onSignIn() {
    const valuesForm = this.formLogin.getRawValue();
    this.signInService
      .signIn({
        username: valuesForm.username ?? '',
        password: valuesForm.password ?? '',
      })
      .subscribe({
        next: (resp) => this.onLogin.emit(true),
        error: (err) => {
          this.handleError(err);
        },
      });
  }

  private handleError(err: HttpErrorResponse) {
    const userOrPasswordInvalid = 'Usuario o contraseña invalido';

    switch (err.status) {
      case 401:
        this.messageError = userOrPasswordInvalid;
        break;
      case 404:
        this.messageError = userOrPasswordInvalid;
        break;
      default:
        this.messageError = `Error inesperado: contactese con el administrador del sistema`
    }

    this.showMessageError = true;
  }
}
