import { ADD_FAVORITE, DELETE_FAVORITE } from "../events/favorites";

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
        case DELETE_FAVORITE: {
            return state.filter((el) => el !== action.payload);
        }

        default: {
            return state;
        }
    }
}
