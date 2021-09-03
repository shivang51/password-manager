export interface Isignupdata {
  email: string;
  password: string;
  uid: string;
}

/**
 * Generates OTP with required len
 * @param len length of otp default length is `6`
 * @returns Generated otp as string
 */
export function generateOTP(len = 6): string {
  // Declare a digits variable
  // which stores all digits
  const digits: string = "0123456789";
  let OTP: string = "";
  for (let i = 0; i < len; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

/**
 * Structure for createuser function promise
 */
export interface ICUPromise {
  created: boolean;
  otp: string;
}

/**
 * Structure for getdocumnet function promise
 */
export interface IGDPromise {
  docData: any;
}
