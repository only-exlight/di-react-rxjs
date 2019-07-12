import * as React from 'react';
import { Subject } from 'rxjs';
import Card from '@material-ui/core/Card';
import { InputAdornment, IconButton, Input, FormControl, InputLabel } from '@material-ui/core';
import { ChatService } from '../../services/chat.service';
import { lazyInject } from '../../di-config';
import { TYPES } from '../../types';
import { Send } from '@material-ui/icons';
import './chat-input.scss';

interface IChatInputProps { }
interface IChatInputState {
    message: string;
}

export class ChatInput extends React.Component<IChatInputProps, IChatInputState> {
    public state: IChatInputState;
    private subscriber = new Subject();
    @lazyInject(TYPES.ChatService) private chatService: ChatService;

    constructor(props: IChatInputProps, state: IChatInputState) {
        super(props, state);
        this.state = {
            message: ''
        }
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
                            value={this.state.message}
                            onKeyDown={(e) => this.enterMessage(e)}
                            onChange={(e) => this.writeMsg(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton edge="end" aria-label="Send message"
                                        onClick={(e) => this.sendMsg(this.state.message)}
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
