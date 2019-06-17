import { User } from './user';
import { Comentarios } from './comentarios';
export class LikeDislike {
    constructor(
        public id: string,
        public comentario: Comentarios,
        public user: User
    ) {}
}
