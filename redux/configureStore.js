import dishes from "./reducers/dishes";
import comments from "./reducers/comments";
import leaders from "./reducers/leaders";
import promotions from "./reducers/promotions";
import favorites from "./reducers/favorites";
import {persistCombineReducers, persistStore} from "redux-persist";
import storage from "redux-persist/es/storage";
import thunk from 'redux-thunk';
import logger from "redux-logger";
import { createStore, applyMiddleware } from 'redux';

export default function() {

    const reducers =  persistCombineReducers({
        key: "root",
        storage,
        debug: true
    },{
        dishes,
        promotions,
        leaders,
        comments,
        favorites
    });

    const store = createStore(
        reducers,
        applyMiddleware(thunk,logger)
    );
    
    const persistor = persistStore(store);

    return {persistor, store};
}
