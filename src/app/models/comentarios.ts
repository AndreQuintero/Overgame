import { User } from './user';
import { Videos } from './videos';

export class Comentarios {
    constructor(
        public id: string,
        public video: Videos,
        public usuarioComment: User,
        public mensagem: string,
        public like: number,
        public dislike: number,
        public publicado: Date,
        public editado: Date
    ) {}
}
