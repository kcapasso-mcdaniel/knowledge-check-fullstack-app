// reducer action and previous state and generate a new state
import actions from "../actions";

export default function questions(state = {}, action) {
   // what is the action type if questions then do the payload
   switch (action.type) {
      case actions.STORE_QUESTIONS:
         return action.payload;
      default:
         return state;
   }
}
