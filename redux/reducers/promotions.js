import { LOADING_PROMO_COMPLETE, LOADING_PROMO_ERROR, LOADING_PROMO_START } from "../events/promotions";

function dishesReducer(state,action) {
    if (!state) {
        return {
            loading: false,
            data: [],
            error: null
        }
    }

    switch(action.type){
        case LOADING_PROMO_COMPLETE: {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        }
        case LOADING_PROMO_ERROR: {
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload
            }
        }
        case LOADING_PROMO_START: {
            return {
                ...state,
                loading: true,
                data: [],
                error: null
            }
        }
        default: {
            return state;
        }
    }

}

export default dishesReducer;
