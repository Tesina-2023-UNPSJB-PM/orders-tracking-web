export interface SignInRequest {
  username: string;
  password: string;
}

interface UserProfile {
  firstName: string,
  lastName: string,
  email: string,
  username: string
}

export interface SignInResponse {
  access_token: string;
  userProfile: UserProfile;
}
