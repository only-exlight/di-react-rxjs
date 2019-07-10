import { Container } from 'inversify';
import { ITestService, TestService } from './services/test.service';
import getDecorators from 'inversify-inject-decorators';

export const TYPES = {
    TestService: Symbol.for('TestService')
}

const DIConatiner = new Container();

DIConatiner.bind<ITestService>(TYPES.TestService).to(TestService);

export const { lazyInject } = getDecorators(DIConatiner);
export { DIConatiner }
