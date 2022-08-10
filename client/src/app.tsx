import { NavLink, Route, Routes } from 'solid-app-router';
import { lazy } from 'solid-js';
import MarkdownEditor from './pages/markdownEditor';
import StyleTest from './pages/styleTest';
import { setState, state } from './state';

const Home = lazy(() => import("./pages/home"));

const ThemeChanger = () => {
    const changeTheme = () => {
        setState(
            "theme", 
            state.theme == "theme_dark" ? 
            "theme_light" : "theme_dark"
        );
    }

    return <button onclick={changeTheme}>{state.theme == "theme_light" ? "☀️" : "🌒"}</button>
}


export const App = () => {
    return (<>
        <nav>
            <NavLink href="/home">Home</NavLink>
            <NavLink href="/markdown_editor">MD Writer</NavLink>
            <NavLink href="/style_test">Style Test</NavLink>
            <ThemeChanger/>
        </nav>
        <main>
            <Routes>
                <Route path="/home" component={Home}></Route>
                <Route path="/markdown_editor" component={MarkdownEditor}></Route>
                <Route path="/style_test" component={StyleTest}></Route>
            </Routes>
        </main>
    </>
    )
}