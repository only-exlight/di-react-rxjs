import { ChatInput } from '../../components/chat-input/chat-input';
import { ChatHistory } from '../../components/chat-history/chat-history';
import * as React from 'react';
import './chat.page.scss';

export function ChatPage() {
    return (
        <React.Fragment>
            <div className="history-container">
                <ChatHistory />
            </div>
            <div className="input-container">
                <ChatInput />
            </div>
        </React.Fragment>
    )
}
