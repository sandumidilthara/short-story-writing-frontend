import { combineReducers } from "redux";

import homeReducer from "./homeSlice.ts"; // Import home reducer
import storyReducer from "./storySlice";
import contentReducer from "./contentSlice.ts";
export const rootReducer = combineReducers({

    home: homeReducer , // Add home reducer
    story : storyReducer,
    content : contentReducer
});

export type RootReducerState = ReturnType<typeof rootReducer>;