import { injectable } from 'inversify';
import { DOMAIN } from '../const/env';
import { Observable, fromEvent, Subject } from 'rxjs';
import { IMessage, Message } from '../models/message.model';
import { map } from 'rxjs/operators';

@injectable()
export class SoketService {
    private ws: WebSocket;
    private messages$ = new Subject<IMessage>();
    private errors$ = new Subject<any>();

    get $messages(): Observable<IMessage> {
        return this.messages$.asObservable();
    }

    get $errors(): Observable<any> {
        return this.errors$.asObservable();
    }

    public connect() {
        this.ws = new WebSocket(`ws://${DOMAIN}`);
        fromEvent<MessageEvent>(this.ws, 'message')
            .pipe(map(e => (JSON.parse(e.data) as IMessage)))
            .subscribe(m => this.messages$.next(m));
        fromEvent(this.ws, 'error').subscribe(e => this.errors$.next(e));
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
        return JSON.stringify(msg.toJSON());
    }
}
