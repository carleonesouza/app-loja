import baseUtil from "@src/util/baseUtil";
import jwt from "jsonwebtoken";
import { JwtToken } from "@src/entities/jwt-token";

export default class AuthService {
  public static generateToken(email: string, id: string): string {
    return jwt.sign({ email: email, userId: id }, baseUtil.JWT_KEY, {
      expiresIn: baseUtil.LOCK_TIME,
    });
  }

  public static decodeToken(token: string): JwtToken {
    return jwt.verify(token, baseUtil.JWT_KEY) as JwtToken;
  }
}
