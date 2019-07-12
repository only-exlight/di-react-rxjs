import { injectable, inject } from 'inversify';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { TYPES } from '../types';
import { UserService } from './user.serivce';
import { User } from '../models/user.model';

@injectable()
export class ChatService {
    @inject(TYPES.ApiService) private apiService: ApiService;
    private msgHistory: Message[] = [];
    private user: User;
    private msgHistory$ = new BehaviorSubject<Message[]>([]);

    constructor(@inject(TYPES.UserService) private userService: UserService) {
        this.userService.$user.subscribe(u => this.user = u);
    }

    get $history(): Observable<Message[]> {
        return this.msgHistory$.asObservable();
    }

    public sendMessage(msg: string) {
        this.msgHistory.push(new Message({
            body: msg,
            sender: this.user.nickname,
            date: new Date()
        }));
        this.msgHistory$.next(this.msgHistory);
    }

    public writeMessage() {
        console.warn('!');
    }
}
