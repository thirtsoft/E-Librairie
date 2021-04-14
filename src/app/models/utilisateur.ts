/*
export class Utilisateur {
  id?: any;
  name?: string;
  username?: string;
  email?: string;
  roles?: any[];
  password?: string;
  photo?: string;
  constructor(id?: any, name?: string, username?: string, email?: string, roles?: any[],
    password?: string, photo?: string) {
    this.id = id ? id : null;
    this.name = name ? name : null;
    this.username = username ? username : null;
    this.email = email ? email : null;
    this.roles = roles ? roles : null;
    this.photo = photo ? photo : null;
    this.password = password ? password : null;
  }

}
*/
export interface IUser {
  id?: any;
  name?: string;
  username?: string;
  email?: string;
  authorities?: any[];
  photo?: string;
  password?: string;
}

export class Utilisateur implements IUser {
  constructor(
      public id?: any,
      public name?: string,
      public username?: string,
      public email?: string,
      public authorities?: any[],
      public photo?: string,
      public password?: string
  ) {
      this.id = id ? id : null;
      this.name = name ? name : null;
      this.username = username ? username : null;
      this.email = email ? email : null;
      this.authorities = authorities ? authorities : null;
      this.photo = photo ? photo : null;
      this.password = password ? password : null;
  }
}
