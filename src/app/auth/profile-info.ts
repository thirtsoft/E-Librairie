export class ProfileInfo {
  id: number;
  name: string;
  username: string;
  newUsername: string;
  email: string;
  password: string;
  newPassword: string;
  photo: string;
}

export class UpdateProfilInfo {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class UpdateUsernameInfo {
  username: string;
  newUsername: string;
}

export class UpdatePasswordInfo {
  username: string;
  oldPassword: string;
  newPassword: string;
}
