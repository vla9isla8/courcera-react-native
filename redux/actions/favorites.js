import { ADD_FAVORITE, DELETE_FAVORITE } from "../events/favorites";

const addFavorite = (id) => ({
    type: ADD_FAVORITE,
    payload: id
});

export const deleteFavorite = (id) => ({
    type: DELETE_FAVORITE,
    payload: id
});

export const postFavorite = (id) => {
    return (dispatch) => {
        setTimeout(
            () => dispatch(addFavorite(id)),
            2000
        );
    }
};
