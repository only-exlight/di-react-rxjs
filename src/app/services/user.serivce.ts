import { injectable } from 'inversify';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@injectable()
export class UserService {
    private user: User;
    private user$ = new BehaviorSubject<User>(null);

    get $user(): Observable<User> {
        return this.user$.asObservable();
    }

    public setUser(nickname: string) {
        this.user = new User({ nickname });
        this.user$.next(this.user);
    }

}
