import { Role } from '../models/role';

export class Register {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string[];
//  role: Array<string> = ['admin', 'user', 'vendeur'];
 // role: Array<string> = [];
 // role :Array<string>=[];
  password: string;
  roles = new Array<string>();

 // role :Array<>=["admin","user","vendeur","employe"];

 getRoles() {
   for (let i= 0; i< this.role.length; i++) {
     this.roles.push(this.role[i]);
   }
 }


  constructor(name: string, username: string, email: string, password: string) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = ['user'];
  //  this.role = this.roles;
   // this.role = this.role;
  }

}
