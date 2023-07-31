import { SignInResponse } from "src/app/dtos/signIn.dto";
import { LoginAction } from "../actions/login.action";

const initialState: SignInResponse= {
  access_token: null,
  userProfile: null
};

export function LoginReducer(state: SignInResponse = initialState, action: LoginAction) {
  return action.payload ? action.payload : state;
}
