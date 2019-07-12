import * as React from 'react';
import Card from '@material-ui/core/Card';
import { InputAdornment, IconButton, Input, FormControl, InputLabel } from '@material-ui/core';
import { ChatService } from '../../services/chat.service';
import { lazyInject } from '../../di-config';
import { TYPES } from '../../types';
import { Send } from '@material-ui/icons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../../services/user.serivce';
import './chat-input.scss';

interface IChatInputProps { }
interface IChatInputState {
    message: string;
    user: string;
}

export class ChatInput extends React.Component<IChatInputProps, IChatInputState> {
    public state: IChatInputState;
    private subscriber = new Subject();
    @lazyInject(TYPES.ChatService) private chatService: ChatService;
    @lazyInject(TYPES.UserService) private userService: UserService;

    constructor(props: IChatInputProps, state: IChatInputState) {
        super(props, state);
        this.state = {
            message: '',
            user: null
        }
    }

    componentWillMount() {
        this.userService.$user.pipe(takeUntil(this.subscriber))
            .subscribe(user => {
                if (user) {
                    this.setState({ user: user.nickname });
                }
            });
    }

    componentWillUnmount() {
        this.subscriber.next(null);
        this.subscriber.complete();
    }

    sendMsg(msg: string) {
        this.chatService.sendMessage(msg);
        this.setState({ message: '' });
    }

    enterMessage(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (e.keyCode === 13) {
            this.sendMsg(this.state.message);
        }
    }

    writeMsg(message: string) {
        this.setState({message});
        this.chatService.writeMessage();
    }

    render() {
        return (
            <Card>
                <div className="chat-input-container">
                    <FormControl className="chat-input">
                        <InputLabel htmlFor="adornment-password">Enter your message</InputLabel>
                        <Input
                            type="text"
                            disabled={!this.state.user}
                            value={this.state.message}
                            onKeyDown={(e) => this.enterMessage(e)}
                            onChange={(e) => this.writeMsg(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton edge="end" aria-label="Send message"
                                        onClick={() => this.sendMsg(this.state.message)}
                                    >
                                        <Send />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
            </Card>
        )
    }
}
