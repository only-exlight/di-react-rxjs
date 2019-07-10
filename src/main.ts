import { render } from 'react-dom';
import * as React from 'react';
import { DIConatiner } from './app/di-config';
import { Application } from './app/app.component';

const root = document.getElementById('app');

render(Application, root)
