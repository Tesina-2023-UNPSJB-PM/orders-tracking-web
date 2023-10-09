import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SignInService } from '../../services/sign-in.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { LoginAction } from 'src/app/store/actions/login.action';
import { Router } from '@angular/router';
import { MAIN_ROUTES } from 'src/app/constants/routes.constant';
import { ORDERS_MANAGEMENT_ROUTES } from 'src/app/orders-management/constants/routes.constant';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent implements OnDestroy {
  showMessageError = false;
  messageError = '';

  private readonly _destroy$: ReplaySubject<boolean> = new ReplaySubject();

  formLogin: FormGroup<{
    username: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router,
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

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }

  onSignIn() {
    const valuesForm = this.formLogin.getRawValue();
    this.signInService
      .signIn({
        username: valuesForm.username ?? '',
        password: valuesForm.password ?? '',
      })
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (resp) => {
          this.store.dispatch(new LoginAction(resp));
          this.router.navigate([
            MAIN_ROUTES.DASHBOARD,
            MAIN_ROUTES.ORDERS_MANAGEMENT,
            ORDERS_MANAGEMENT_ROUTES.ORDERS_LIST,
          ]);
        },
        error: (err) => this.handleError(err),
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
        this.messageError = `Error inesperado: contactese con el administrador del sistema`;
    }

    this.showMessageError = true;
  }
}
