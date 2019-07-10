
import { injectable } from 'inversify';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ITestService {
    $shareText: Observable<string>;
    someMethod(val: string): void;
}

@injectable()
export class TestService implements ITestService {
    private shareText = new BehaviorSubject<string>('');

    get $shareText(): Observable<string> {
        return this.shareText.asObservable();
    }

    someMethod(val: string): void {
        this.shareText.next(val);
    }
}
