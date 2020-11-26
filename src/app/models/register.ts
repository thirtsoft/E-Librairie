import { Role } from './role';

export class Register {
    id: number;
    username: string;
    password: string;
    confirmPassword: string;

    role: Role[];
}
