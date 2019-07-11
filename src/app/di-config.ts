import { Container } from 'inversify';
import { ITestService, TestService } from './services/test.service';
import getDecorators from 'inversify-inject-decorators';
import { ApiService } from './services/api.service';

export const TYPES = {
    TestService: Symbol.for('TestService'),
    ApiService: Symbol.for('ApiService'),
}

export const DIConatiner = new Container();

DIConatiner.bind<ITestService>(TYPES.TestService).to(TestService);
DIConatiner.bind<ApiService>(TYPES.ApiService).to(ApiService);

export const { lazyInject } = getDecorators(DIConatiner);
