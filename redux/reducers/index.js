import { combineReducers } from "redux";
import dishes from "./dishes";
import comments from "./comments";
import leaders from "./leaders";
import promotions from "./promotions";

export default combineReducers({
    dishes,
    promotions,
    leaders,
    comments
});
