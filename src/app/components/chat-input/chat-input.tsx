import * as React from 'react';
import { Subject } from 'rxjs';
import Card from '@material-ui/core/Card';
import { InputAdornment, IconButton, Input, FormControl, InputLabel } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import './chat-input.scss';

interface IChatInputProps { }
interface IChatInputState { }

export class ChatInput extends React.Component<IChatInputProps, IChatInputState> {
    public state: IChatInputState;
    private subscriber = new Subject();

    constructor(props: IChatInputProps, state: IChatInputState) {
        super(props, state);
        this.state = {
            text: ''
        }
    }

    componentWillUnmount() {
        this.subscriber.next(null);
        this.subscriber.complete();
    }

    sendMsg(e: any) {

    }

    render() {
        return (
            <Card>
                <div className="chat-input-container">
                    <FormControl className="chat-input">
                        <InputLabel htmlFor="adornment-password">Enter your message</InputLabel>
                        <Input
                            id="adornment-password"
                            type="text"
                            onChange={() => { console.warn('!') }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton edge="end" aria-label="Send message"
                                        onClick={this.sendMsg}
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