
import { injectable } from 'inversify';
import { BehaviorSubject, Observable } from 'rxjs';
import { generate } from 'randomstring';

export interface ITestService {
    $shareText: Observable<string>;
    someMethod(val: string): void;
}

@injectable()
export class TestService implements ITestService {
    private shareText = new BehaviorSubject<string>('');

    constructor() {
        setInterval(() => this.shareText.next(generate(7)), 2000);
    }

    get $shareText(): Observable<string> {
        return this.shareText.asObservable();
    }

    someMethod(val: string): void {
        this.shareText.next(val);
    }
}
