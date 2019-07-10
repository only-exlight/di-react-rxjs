import * as React from 'react';
import { TestComponent } from './components/test.component';
import { TestComponent2 } from './components/test2.component';


interface IApplicationState { }
interface IApplicationProps { }

export class Application extends React.Component<IApplicationState, IApplicationProps> {
    
    public render(): React.ReactElement<any, any> {
        return (
            <div>
                <h1>Welcome to ReactJS application!</h1>
                <div>This is experemental application with use InversifyJS and RxJS</div>
                <TestComponent />
                <TestComponent2 />
            </div>
        );
    }
}
