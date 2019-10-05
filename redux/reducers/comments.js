import { LOADING_COMMENTS_COMPLETE, LOADING_COMMENTS_ERROR, LOADING_COMMENTS_START, ADD_COMMENT } from "../events/comments";

function dishesReducer(state,action) {
    if (!state) {
        return {
            loading: false,
            data: [],
            error: null
        }
    }

    switch(action.type) {
        case ADD_COMMENT: {
            const comment = {
                ...action.payload,
                id: state.data.length,
                date: new Date().toISOString()
            };
            return {
                ...state,
                data: [
                    ...state.data,
                    comment
                ]
            };
        }
        case LOADING_COMMENTS_COMPLETE: {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        }
        case LOADING_COMMENTS_ERROR: {
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload
            }
        }
        case LOADING_COMMENTS_START: {
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
