import baseUtil from "@src/util/baseUtil";
import jwt from "jsonwebtoken";

export interface JwtToken {
  sub: string;
}

export default class AuthService {
  public static generateToken(user: { email: unknown; id: unknown }): string {
    return jwt.sign({ email: user.email, userId: user.id }, baseUtil.JWT_KEY, {
      expiresIn: baseUtil.LOCK_TIME,
    });
  }

  public static decodeToken(token: string): JwtToken {
    return jwt.verify(token, baseUtil.JWT_KEY) as JwtToken;
  }
}
