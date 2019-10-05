import { LOADING_LEADERS_COMPLETE, LOADING_LEADERS_ERROR, LOADING_LEADERS_START } from "../events/leaders";

function dishesReducer(state,action) {
    if (!state) {
        return {
            loading: false,
            data: [],
            error: null
        }
    }

    switch(action.type){
        case LOADING_LEADERS_COMPLETE: {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        }
        case LOADING_LEADERS_ERROR: {
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload
            }
        }
        case LOADING_LEADERS_START: {
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
