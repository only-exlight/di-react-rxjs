import * as React from 'react';
import { TYPES, lazyInject } from '../di-config';
import { ITestService } from '../services/test.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Card from '@material-ui/core/Card';

interface ITest2Props {}
interface ITest2State {
    text: string;
}

export class ChatInput extends React.Component<ITest2Props, ITest2State> {
    public state: ITest2State;
    @lazyInject(TYPES.TestService) private testSrv: ITestService;
    private subscriber = new Subject();

    constructor(props:ITest2Props, state: ITest2State) {
        super(props, state);
        this.state = {
            text: ''
        }
        this.testSrv.$shareText.pipe(takeUntil(this.subscriber))
            .subscribe(text => this.setState({text}));
    }

    componentWillUnmount() {
        this.subscriber.next(null);
        this.subscriber.complete();
    }

    render() {
        return (
            <Card>
                
            </Card>
        )
    }
}
