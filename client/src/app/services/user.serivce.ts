import { injectable, inject } from 'inversify';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { TYPES } from '../types';
import { SoketService } from './soket.service';

@injectable()
export class UserService {
    private user: User;
    @inject(TYPES.SoketService) private socketSrv: SoketService;
    private user$ = new BehaviorSubject<User>(null);

    get $user(): Observable<User> {
        return this.user$.asObservable();
    }

    public setUser(nickname: string) {
        this.user = new User({ nickname });
        this.user$.next(this.user);
        this.socketSrv.connect();
    }

}
