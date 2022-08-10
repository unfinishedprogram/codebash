import { NavLink, Route, Routes } from 'solid-app-router';
import { lazy } from 'solid-js';

import MDWriter from './pages/mdWriter';

const Home = lazy(() => import("./pages/home"));
const Match = lazy(() => import("./pages/match"));

export const App = () => {
    return (<>
        <nav>
            <NavLink href="/home">Home</NavLink>
            <NavLink href="/match">Match</NavLink>
            <NavLink href="/mdwriter">MD Writer</NavLink>
        </nav>
        <main>
            <Routes>
                <Route path="/home" component={Home}></Route>
                <Route path="/mdwriter" component={MDWriter}></Route>
            </Routes>
        </main>
    </>
    )
}