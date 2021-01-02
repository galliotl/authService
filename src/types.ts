export type ErrorResponse = {
  message: string;
  payload?: Record<string, unknown>;
};

export type TokenPayload = {
  uid: string;
  type: "access" | "refresh";
};

export type AccessToken = TokenPayload & {
  type: "access";
};

export type RefreshToken = TokenPayload & {
  type: "refresh";
};
