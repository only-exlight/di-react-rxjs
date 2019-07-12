import * as React from 'react';
import LoginCard from '../../components/login-card/login-card';
import './login.scss';

export function LoginPage() {
    return (
        <React.Fragment>
            <div className="login-container">
                <LoginCard />
            </div>
        </React.Fragment>
    )
}
