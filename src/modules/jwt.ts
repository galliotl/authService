import * as jwt from "jsonwebtoken";
import { jwtSecretKey } from "../config";
import { TokenPayload } from "../types";

const createToken = async (
  payload: string | object | Buffer,
  options: jwt.SignOptions = { expiresIn: "90d" }
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    jwt.sign(payload, jwtSecretKey, options, (err, token: string) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

export const createAccessToken = (uid: string) => {
  return createToken({ uid, type: "access" }, { expiresIn: "24h" });
};
export const createRefreshToken = (uid: string) => {
  return createToken({ uid, type: "refresh" });
};

export const createPasswordResetToken = () => {
  return createToken("reset password", { expiresIn: "600s" });
};

export const getTokenData = async (token: string): Promise<object> => {
  return new Promise((res, rej) => {
    jwt.verify(token, jwtSecretKey, (err, data) => {
      if (err) rej(err);
      else res(data);
    });
  });
};

/** GUARDS */
export const isToken = (obj: any): obj is TokenPayload => obj.uid && obj.type;
export const isAccessToken = (token: TokenPayload) => token.type === "access";
export const isRefreshToken = (token: TokenPayload) => token.type === "refresh";
