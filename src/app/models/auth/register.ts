import { Role } from '../role';

export class Register {
  //  id: number;
  name: string;
  username: string;
  email: string;
  role: Role[];
  password: string;

  constructor(name: string, username: string, email: string,
    password: string, role: Role[]) {
      this.name = name;
      this.username = username;
      this.email = email;
      this.role = ['user'];
      this.password = password;
    }


}
