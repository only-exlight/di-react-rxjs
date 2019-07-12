import * as React from 'react';
import { TYPES, lazyInject } from '../../di-config';
import { Subject } from 'rxjs';
import Card from '@material-ui/core/Card';
import { ChatService } from '../../services/chat.service';
import './chat-history.scss';

interface ITest2Props { }
interface ITest2State {
    text: string;
}

export class ChatHistory extends React.Component<ITest2Props, ITest2State> {
    public state: ITest2State;
    @lazyInject(TYPES.ChatService) private chatSrv: ChatService;
    private subscriber = new Subject();

    constructor(props: ITest2Props, state: ITest2State) {
        super(props, state);
        this.state = {
            text: ''
        }
    }

    componentWillUnmount() {
        this.subscriber.next(null);
        this.subscriber.complete();
    }

    render() {
        return (
            <Card>
                <div className="history"></div>
            </Card>
        )
    }
}
