import { injectable } from 'inversify';
import { DOMAIN } from '../const/env';
import { Observable, fromEvent } from 'rxjs';
import { IMessage, Message } from '../models/message.model';

@injectable()
export class SoketService {
    private ws: WebSocket;
    public messages$ = new Observable<IMessage>();
    public errors$ = new Observable<any>();

    public connect() {
        this.ws = new WebSocket(DOMAIN);
        this.messages$ = fromEvent<IMessage>(this.ws, 'message');
        this.errors$ = fromEvent(this.ws, 'error');
    }

    public disconect(): void {
        if (this.ws) {
            this.ws.close();
        }
    }

    public send(msg: Message) {
        this.ws.send(this.serealize(msg));
    }

    private serealize(msg: Message)  {
        return JSON.stringify(msg.toJSON);
    }
}