import { ErrorResponse } from "./types";

export class AuthError extends Error {
  /** HTTP status */
  code = 500;
  message = "Something went wrong";

  buildErrorResponse(payload?: Record<string, unknown>): ErrorResponse {
    return {
      payload,
      message: this.message,
    };
  }
}

export class UserDoesNotExistError extends AuthError {
  code = 400;
  message = "User does not exist";
}

export class PasswordDontMatchError extends AuthError {
  code = 400;
  message = "passwords don't match";
}

export class NotAuthorizedError extends AuthError {
  code = 403;
  message = "not authorized";
}
