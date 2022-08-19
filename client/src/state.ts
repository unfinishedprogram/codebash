import { createStore } from "solid-js/store";
import "../../node-client/src/index";

export interface IGlobalState {
    theme: `theme_${ "dark" | "light" }`
    game: {
        room_id:string,
    }
}

const theme = matchMedia("prefers-color-scheme: dark") ? "theme_dark" : "theme_light";

function getInitialState() : IGlobalState {
    return {
        theme, 
        game: {
            room_id: "123456789"
        }
    }
}

export const [state, setState] = createStore<IGlobalState>(getInitialState());