import { User } from './user';
import { Comentarios } from './comentarios';
export class Videos {

    constructor(
        public id: string,
        public videoCaminho: string,
        public user: User,
        public publicado: Date,
        public visualizacoes: number,
        public likes: number,
        public dislikes: number,
        public comentarios: Comentarios[],
        public titulo: string,
        public descricao: string,
        public nomeJogo: string
    ) {}

    public calculaPorcentagem(like: number, dislike: number, likeOrDislike: string): number {
        const total = like + dislike;
        if (likeOrDislike === 'like') {
            return Math.abs((like / total) * 100);
        } else {
            return Math.abs((dislike / total) * 100);
        }
    }
}
