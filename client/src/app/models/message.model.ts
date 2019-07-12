import * as Moment from 'moment';
export interface IMessage {
    sender: string;
    body: string;
    date: Moment.Moment | string | Date;
}

export class Message implements IMessage {
    body = this.__date.body;
    sender = this.__date.sender;
    date = Moment(this.__date.date);

    constructor(private __date: IMessage) { }

    get time(): string {
        return this.date.format('HH:mm');
    }

    public toJSON(): IMessage {
        return {
            body: this.body,
            sender: this.sender,
            date: this.date
        }
    }
}
