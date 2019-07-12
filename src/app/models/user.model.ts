export interface IUser {
    nickname: string;
}

export class User implements IUser {
    nickname = this.__date.nickname;

    constructor(private __date: IUser) { }

    toJSON() {
        return { };
    }
}
