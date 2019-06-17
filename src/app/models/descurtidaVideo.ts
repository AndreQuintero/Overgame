import { User } from './user';
import { Videos } from './videos';
export class DescurtidaVideo {
    constructor(
        public id: string,
        public video: Videos,
        public user: User
    ) {}
}
