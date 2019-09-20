import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import userReducer from "./userReducer";
import galleryReducer from "./galleryReducer";

const reducers= combineReducers({
    form: formReducer,
    user: userReducer,
    gallery: galleryReducer
});

export default reducers;