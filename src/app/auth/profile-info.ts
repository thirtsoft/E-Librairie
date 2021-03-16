export class ProfileInfo {
  id: number;
  name: string;
  username: string;
  newUsername: string;
  email: string;
  password: string;
  newPassword: string;
}

export class UpdateUsernameInfo {
  username: string;
  newUsername: string;
}

export class UpdatePasswordInfo {
  username: string;
  password: string;
  newPassword: string;
}
