import { LOADING_LEADERS_COMPLETE, LOADING_LEADERS_ERROR, LOADING_LEADERS_START } from "../events/leaders";
import { get } from "../../datasource";

const loadStart = () => ({
    type: LOADING_LEADERS_START
});

const loadComplete = (dishes) => ({
    type: LOADING_LEADERS_COMPLETE,
    payload: dishes
});

const loadError = (error) => ({
    type: LOADING_LEADERS_ERROR,
    payload: error
});


export const loadLeaders = () => {
    return (dispatch) => {
        dispatch(loadStart());
        get("leaders").then(response => {
            dispatch(loadComplete(response));
        }).catch(reason => {
            dispatch(loadError(reason.message));
        })
    }
}