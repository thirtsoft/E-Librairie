import { Role } from './role';

export interface IUser {
  id?: any;
  name?: string;
  username?: string;
  email?: string;
  roles?: Role[];
  photo?: string;
  password?: string;
  active?: boolean;
}

export class Utilisateur implements IUser {
  constructor(
      public id?: any,
      public name?: string,
      public username?: string,
      public email?: string,
      public roles?: Role[],
      public photo?: string,
      public password?: string,
      public active?: boolean
  ) {
      this.id = id ? id : null;
      this.name = name ? name : null;
      this.username = username ? username : null;
      this.email = email ? email : null;
      this.roles = roles ? roles : null;
      this.photo = photo ? photo : null;
      this.password = password ? password : null;
      this.active = active ? active : null;
  }
}
