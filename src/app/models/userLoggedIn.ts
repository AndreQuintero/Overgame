import { User } from './user';
export class UserLoggendIn {
    constructor(
        public token: string,
        public user: User
    ) {}
}
