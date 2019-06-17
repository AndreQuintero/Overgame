export class User {

    constructor(

        public id: string,
        public email: string,
        public username: string,
        public password: string,
        public profile: string,
        public description: string,
        public avatar: string,
        public createdBy: Date,
        public dataNascimento: Date
    ) {}
}
