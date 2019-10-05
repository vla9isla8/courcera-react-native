import { LOADING_COMMENTS_COMPLETE, LOADING_COMMENTS_ERROR, LOADING_COMMENTS_START } from "../events/comments";
import { get } from "../../datasource";

const loadStart = () => ({
    type: LOADING_COMMENTS_START
});

const loadComplete = (dishes) => ({
    type: LOADING_COMMENTS_COMPLETE,
    payload: dishes
});

const loadError = (error) => ({
    type: LOADING_COMMENTS_ERROR,
    payload: error
});


export const loadComments = () => {
    return (dispatch) => {
        dispatch(loadStart());
        get("comments").then(response => {
            dispatch(loadComplete(response));
        }).catch(reason => {
            dispatch(loadError(reason.message));
        })
    }
}