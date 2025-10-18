export interface loginModel {
  email: string;
  password: string;
}

export interface loginResponse {
  token: string;
  refreshToken: string;
  refreshTokenExpiryTime: string;
  userId: string;
  isOTPVerified: boolean;
  isProfileLocked: boolean;
}

export interface registrationModel {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  referralCode: string;
}
