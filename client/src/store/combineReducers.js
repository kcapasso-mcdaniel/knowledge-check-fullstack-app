import { combineReducers } from "redux";
import currentUser from "./reducers/currentUser";
import questions from "./reducers/questions";
import userQuestions from "./reducers/userQuestions";
import editableQuestion from "./reducers/editableQuestion";

export default combineReducers({
   currentUser,
   questions,
   userQuestions,
   editableQuestion,
});
