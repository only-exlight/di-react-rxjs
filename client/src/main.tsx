import 'reflect-metadata';
import { render } from 'react-dom';
import * as React from 'react';
import { Application } from './app/app.component';
import './styles.scss';

const root = document.getElementById('app');

render(<Application />, root)
