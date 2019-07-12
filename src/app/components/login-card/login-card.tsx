import * as React from 'react';
import './login-card.scss';
import { User } from '../../models/user.model';
import { Card, Button, Input, InputLabel, FormControl } from '@material-ui/core';
import { lazyInject } from '../../di-config';
import { TYPES } from '../../types';
import { UserService } from '../../services/user.serivce';
import { withRouter } from 'react-router-dom';
import { StaticContext } from 'react-router';

interface ILoginCardState {
    user: User;
    nickname: string;
}

class LoginCard extends React.Component<any, ILoginCardState> {
    @lazyInject(TYPES.UserService) private userSrv: UserService;

    constructor(props: StaticContext, state: ILoginCardState) {
        super(props);
        this.state = {
            user: null,
            nickname: ''
        }
    }

    loginToChat() {
        if (this.state.nickname) {
            this.userSrv.setUser(this.state.nickname);
            this.props.history.push({
                pathname: '/chat'
            })
        }
    }

    render() {
        return (
            <Card>
                <div className="login">
                    <div className="login-head">
                        Welcome!
                    </div>
                    <div className="login-body">
                        <FormControl className="nickname-input">
                            <InputLabel htmlFor="adornment-password">Enter your nickname</InputLabel>
                            <Input
                                type="text"
                                disabled={!!this.state.user}
                                value={this.state.nickname}
                                onChange={(e) => this.setState({ nickname: e.target.value })}
                            />
                        </FormControl>
                    </div>
                    <div className="login-footer">
                        <Button variant="contained" color="primary"
                            onClick={() => this.loginToChat()}>
                            Login to chat
                        </Button>
                    </div>
                </div>
            </Card>
        )
    }

}

export default withRouter(LoginCard)
