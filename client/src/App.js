import React from "react";
import "./style/master.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/pages/Landing";
import CreateQuestion from "./components/pages/CreateQuestion";
import UserReport from "./components/pages/UserReport";
import NotFound from "./components/pages/NotFound";
import AssignQuestion from "./components/pages/AssignQuestion";
import AssignedToMe from "./components/pages/AssignedToMe";
import EditQuestion from "./components/pages/EditQuestion";
import jwtDecode from "jwt-decode";
import store from "./store/store";
import actions from "./store/actions";

const authToken = localStorage.authToken;
if (authToken) {
   // if authToken is not expired
   const currentTimeInSec = Date.now() / 1000;
   const user = jwtDecode(authToken);
   if (currentTimeInSec > user.exp) {
      console.log("expired-token");
      // remove the currentUser from the global state/redux store
      store.dispatch({
         type: actions.UPDATE_CURRENT_USER,
         payload: {},
      });
   } else {
      console.log("valid-token");
      store.dispatch({
         type: actions.UPDATE_CURRENT_USER,
         payload: user,
      });

      // set authorization headers
      const currentUrl = window.location.pathname;
      if (currentUrl === "/") {
         window.location.href = "/assign-question";
      }
   }
} else {
   console.log("no token");
}

function App() {
   return (
      <Router>
         {/* switch will wrap the individual routes */}
         <Switch>
            {/* render the component when the path is called in the url  */}
            <Route exact path="/" component={Landing} />
            <Route exact path="/create-question" component={CreateQuestion} />
            {/* colan after route path is a variable(can be changed to whatever we want) */}
            <Route exact path="/edit-question/:id" component={EditQuestion} />
            <Route exact path="/user-report" component={UserReport} />
            <Route exact path="/assign-question" component={AssignQuestion} />
            <Route exact path="/assigned-to-me" component={AssignedToMe} />
            {/* if url does not match above render this component */}
            <Route component={NotFound} />
         </Switch>
      </Router>
   );
}

export default App;
