import { LOADING_DISHES_COMPLETE, LOADING_DISHES_ERROR, LOADING_DISHES_START } from "../events/dishes";

function dishesReducer(state,action) {
    if (!state) {
        return {
            loading: false,
            data: [],
            error: null
        }
    }

    switch(action.type){
        case LOADING_DISHES_COMPLETE: {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        }
        case LOADING_DISHES_ERROR: {
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload
            }
        }
        case LOADING_DISHES_START: {
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
