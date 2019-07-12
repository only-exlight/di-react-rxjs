import getDecorators from 'inversify-inject-decorators';
import { Container } from 'inversify';
import { ApiService } from './services/api.service';
import { ChatService } from './services/chat.service';
import { UserService } from './services/user.serivce';
import { SoketService } from './services/soket.service';

export const TYPES = {
    ApiService: Symbol.for('ApiService'),
    ChatService: Symbol.for('ChatService'),
    SoketService: Symbol.for('SocketService'),
    UserService: Symbol.for('UserService')
}

const DIConatiner = new Container();

DIConatiner.bind<ApiService>(TYPES.ApiService).to(ApiService);
DIConatiner.bind<ChatService>(TYPES.ChatService).to(ChatService);
DIConatiner.bind<UserService>(TYPES.UserService).to(UserService);
DIConatiner.bind<SoketService>(TYPES.SoketService).to(SoketService);

export { DIConatiner }
export const { lazyInject } = getDecorators(DIConatiner);
