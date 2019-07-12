import getDecorators from 'inversify-inject-decorators';
import { Container } from 'inversify';
import { ApiService } from './services/api.service';
import { ChatService } from './services/chat.service';
import { UserService } from './services/user.serivce';
import { SoketService } from './services/soket.service';
import { TYPES } from './types';

const DI = new Container();

DI.bind<ApiService>(TYPES.ApiService).to(ApiService).inSingletonScope();
DI.bind<ChatService>(TYPES.ChatService).to(ChatService).inSingletonScope();
DI.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
DI.bind<SoketService>(TYPES.SoketService).to(SoketService).inSingletonScope();

export { DI }
export const { lazyInject, lazyInjectNamed, lazyInjectTagged } = getDecorators(DI);
