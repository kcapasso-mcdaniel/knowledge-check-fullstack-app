// reducer action and previous state and generate a new state
import actions from "../actions";

export default function currentUser(state = {}, action) {
   // action.payload(do the thing that we said), action.type(what is the action type)
   switch (action.type) {
      case actions.UPDATE_CURRENT_USER: //sending a string to tell me what to do
         return action.payload; // [{}, {}]
      default:
         return state;
   }
}
