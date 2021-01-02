import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors";
import { getTokenData, isAccessToken, isToken } from "../modules/jwt";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) throw new NotAuthorizedError("No bearer header");
    const token = bearerHeader.split(" ")[1];
    const data = await getTokenData(token);
    if (!isToken(data) || !isAccessToken(data)) {
      throw new NotAuthorizedError("Token is not of the right type");
    } else {
      req.body._uid = data.uid;
    }
    next();
  } catch (err) {
    res.status(403).json(new NotAuthorizedError().buildErrorResponse());
  }
};

export const verifyB64Token = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Decodes the token
};
