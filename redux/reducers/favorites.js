import { ADD_FAVORITE } from "../events/favorites";

export default function(state,action) {
    if (!state) {
        return [];
    }

    switch (action.type) {

        case ADD_FAVORITE: {
            if (state.some(el => el === action.payload) ) {
                return state;
            }
            return [
                ...state,
                action.payload
            ];
        }

        default: {
            return state;
        }
    }
}
