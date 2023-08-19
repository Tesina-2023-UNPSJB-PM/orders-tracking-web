export interface SignInRequest {
  username: string;
  password: string;
}

export interface UserProfile {
  firstName: string,
  lastName: string,
  email: string,
  username: string
}

export interface SignInResponse {
  access_token: string | null;
  userProfile: UserProfile | null;
  employeeId: number;
}
