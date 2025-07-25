import { combineReducers } from "redux";

import homeReducer from "./homeSlice.ts"; // Import home reducer
import storyReducer from "./storySlice";
import contentReducer from "./contentSlice.ts";
import writingtReducer from "./startWritingSlice.ts";
import registerReducer from "./registerSlice.ts";

export const rootReducer = combineReducers({

    home: homeReducer , // Add home reducer
    story : storyReducer,
    content : contentReducer,
    write : writingtReducer,
    register: registerReducer

});

export type RootReducerState = ReturnType<typeof rootReducer>;