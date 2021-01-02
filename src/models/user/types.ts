type UserAuth = {
  uid: string;
  email: string;
  password: string;
};

type UserActions = {
  generatePasswordHash: (pwd: string) => Promise<string>;
  comparePassword: (pwd: string, hashedPwd: string) => boolean;
};

export type User = UserAuth & UserActions;
