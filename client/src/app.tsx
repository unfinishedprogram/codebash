import { NavLink, Route, Routes, useRoutes } from 'solid-app-router';
import { lazy } from 'solid-js';

const Home = lazy(() => import("./pages/home"));
const Test = lazy(() => import("./pages/test"));
const IDE = lazy(() => import("./pages/IDE"));

export const App = () => {
    return (<>
        <nav>
            <NavLink href="/home">Home</NavLink>
            <NavLink href="/test">Test</NavLink>
            <NavLink href="/ide">IDE</NavLink>
        </nav>
        <main>
            <Routes>
                <Route path="/home" component={Home}></Route>
                <Route path="/test" component={Test}></Route>
                <Route path="/ide" component={IDE}></Route>
            </Routes>
        </main>
    </>
    )
}