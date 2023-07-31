import { Action } from "@ngrx/store";
import { SignInResponse } from "src/app/dtos/signIn.dto";

export enum LoginActionType {
  LOGIN_USER = "[Login Page] Login Success"
}

export class LoginAction implements Action {
  type = LoginActionType.LOGIN_USER;

  constructor(private _payload: SignInResponse){}

  get payload() {
    return this._payload;
  }
}
