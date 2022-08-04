import { render } from 'solid-js/web';
import { Router } from 'solid-app-router';
import { App } from './app';

render(() => (
    <Router>
        <App></App>
    </Router>
), document.querySelector('#root')!);
