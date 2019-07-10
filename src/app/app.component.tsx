import * as React from 'react';

export interface IApplicationState { }
export interface IApplicationProps { }

export class Application extends React.Component<IApplicationState, IApplicationProps> {
    
    public render() {
        return (
            <div>
                <h1>Welcome to ReactJS application!</h1>
                <div>This is experemental application with use InversifyJS and RxJS</div>
            </div>
        );
    }
}
