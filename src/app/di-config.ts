import { Container } from 'inversify';
import { ITestService, TestService } from './services/test.service';

const TYPES = {
    TestService: Symbol.for('TestService')
}

export const DIConatiner = new Container();

DIConatiner.bind<ITestService>(TYPES.TestService).to(TestService);
