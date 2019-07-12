import * as React from 'react';
import { lazyInject } from '../../di-config';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Card } from '@material-ui/core';
import { ChatService } from '../../services/chat.service';
import { TYPES } from '../../types';
import { Message } from '../../models/message.model';
import './chat-history.scss';

interface ITest2Props { }
interface ITest2State {
    history: Message[];
}

export class ChatHistory extends React.Component<ITest2Props, ITest2State> {
    public state: ITest2State;
    @lazyInject(TYPES.ChatService) private chatSrv: ChatService;
    private subscriber = new Subject();

    constructor(props: ITest2Props, state: ITest2State) {
        super(props, state);
        this.state = {
            history: []
        }
        this.chatSrv.$history.pipe(takeUntil(this.subscriber))
            .subscribe(history => this.setState({ history }));
    }

    componentWillUnmount() {
        this.subscriber.next(null);
        this.subscriber.complete();
    }

    render() {
        return (
            <Card>
                <div className="history-head">NTRlab Tomsk</div>
                <hr />
                <div className="history">
                    <div className="messages">
                        {
                            this.state.history.map(msg => (
                                <div className="message">
                                    <div className="sender">
                                        <span>{msg.sender}</span>:
                                    </div>
                                    <div className="body">
                                        <span>{msg.body}</span>
                                    </div>
                                    <div className="date">
                                        <span>{msg.time}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Card>
        )
    }
}
