import * as React from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { ROUTES } from './routes';
// import { MuiThemeProvider } from '@material-ui/core/styles';;

interface IApplicationState { }
interface IApplicationProps { }

export class Application extends React.Component<IApplicationState, IApplicationProps> {

    public render(): React.ReactElement<any, any> {
        return (
            <BrowserRouter>
                <AppBar position="static">
                    <Toolbar>
                        <Link to="chat">
                            <Button color="inherit">Chat</Button>
                        </Link>
                        <Link to="login">
                            <Button color="inherit">Login</Button>
                        </Link>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="sm">
                    {
                        ROUTES.map(r => (
                            <Route path={r.path} component={r.component} />
                        ))
                    }
                </Container>
            </BrowserRouter>
        );
    }
}
