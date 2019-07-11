export interface IMessage {
    sender: string;
    body: string;
    date: Date | string;
}

export class Message implements IMessage {
    body = this.__date.body;
    sender = this.__date.sender;
    date = this.__date.date;

    constructor(private __date: IMessage) { }

    public toJSON(): IMessage {
        return {
            body: this.body,
            sender: this.sender,
            date: this.date
        }
    }
}