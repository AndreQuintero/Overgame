import { Videos } from './videos';
import { User } from './user';
export class CurtidaVideo {

    constructor(
        public id: string,
        public user: User,
        public video: Videos
    ) {}

}
