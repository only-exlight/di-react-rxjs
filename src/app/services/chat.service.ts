import { injectable, inject } from 'inversify';
import { TYPES } from '../di-config';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message.model';

@injectable()
export class ChatService {
    @inject(TYPES.ApiService) private apiService: ApiService;
    private msgHistory: Message[] = [];
    private msgHistory$ = new BehaviorSubject<Message[]>([]);

    constructor() { }

    get $history(): Observable<Message[]> {
        return this.msgHistory$.asObservable();
    }

    public sendMessage(msg: string) { }
}