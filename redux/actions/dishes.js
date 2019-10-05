import { LOADING_DISHES_COMPLETE, LOADING_DISHES_ERROR, LOADING_DISHES_START } from "../events/dishes";
import { get } from "../../datasource";

const loadStart = () => ({
    type: LOADING_DISHES_START
});

const loadComplete = (dishes) => ({
    type: LOADING_DISHES_COMPLETE,
    payload: dishes
});

const loadError = (error) => ({
    type: LOADING_DISHES_ERROR,
    payload: error
});


export const loadDishes = () => {
    return (dispatch) => {
        dispatch(loadStart());
        get("dishes").then(response => {
            dispatch(loadComplete(response));
        }).catch(reason => {
            dispatch(loadError(reason.message));
        })
    }
}
