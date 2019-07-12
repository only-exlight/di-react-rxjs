import { injectable, inject } from 'inversify';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { TYPES } from '../types';
import { UserService } from './user.serivce';
import { User } from '../models/user.model';
import { SoketService } from './soket.service';
import { map } from 'rxjs/operators';

@injectable()
export class ChatService {
    @inject(TYPES.ApiService) private apiService: ApiService;

    private msgHistory: Message[] = [];
    private user: User;
    private msgHistory$ = new BehaviorSubject<Message[]>([]);

    constructor(
        @inject(TYPES.UserService) private userService: UserService,
        @inject(TYPES.SoketService) private socketSrv: SoketService
    ) {
        this.userService.$user.subscribe(u => this.user = u);
        this.socketSrv.$messages.subscribe(msg  => {
            const message = new Message(msg)
            this.msgHistory.push(message);
            this.msgHistory$.next(this.msgHistory);
        });
        this.socketSrv.$errors.subscribe(err => console.error(err));
    }

    get $history(): Observable<Message[]> {
        return this.msgHistory$.asObservable();
    }

    public sendMessage(msg: string) {
        const message = new Message({
            body: msg,
            sender: this.user.nickname,
            date: new Date()
        });
        this.msgHistory.push(message);
        this.socketSrv.send(message);
        this.msgHistory$.next(this.msgHistory);
    }

    public writeMessage() {
        console.warn('!');
    }
}
