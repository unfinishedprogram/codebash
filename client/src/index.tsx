import { render } from 'solid-js/web';
import { Router } from 'solid-app-router';
import { App } from './app';
import { createEffect } from 'solid-js';
import { state } from "./state";

const root = document.querySelector('#root')!


render(() => {
    createEffect(() => {
        root.className = state.theme;
        document.documentElement.setAttribute(
            "data-color-scheme",
            state.theme == "theme_light" ? "light" : "dark"
        );
    });

    return <Router>
        <App></App>
    </Router>
}, root);
