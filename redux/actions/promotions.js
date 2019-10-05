import { LOADING_PROMO_COMPLETE, LOADING_PROMO_ERROR, LOADING_PROMO_START } from "../events/promotions";
import { get } from "../../datasource";

const loadStart = () => ({
    type: LOADING_PROMO_START
});

const loadComplete = (dishes) => ({
    type: LOADING_PROMO_COMPLETE,
    payload: dishes
});

const loadError = (error) => ({
    type: LOADING_PROMO_ERROR,
    payload: error
});


export const loadPromotions = () => {
    return (dispatch) => {
        dispatch(loadStart());
        get("promotions").then(response => {
            dispatch(loadComplete(response));
        }).catch(reason => {
            dispatch(loadError(reason.message));
        })
    }
}
