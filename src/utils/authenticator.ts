import * as OTPAuth from "otpauth"
import { ContextStore as cs } from './contextStore'
import { Environment } from "./platformUtils";

export class Authenticator {

  static generateTOTP(env: Environment){
    let totp = new OTPAuth.TOTP({
      issuer: "Microsoft",
      label: `${env}`,
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: cs.get<string>(`ms-key-${env}`),
    });
    
    return totp.generate()
  }
}