import React from "react";
import Navigation from "../ui/Navigation";
import caretDownIcon from "../../icons/caret-down.svg";
import caretRightIcon from "../../icons/caret-right.svg";
// import userQuestions from "../../data/user-questions";
import axios from "axios";
// import actions from "../../store/actions";
import { connect } from "react-redux";

// TODO LIST
// set up a search for the user with the typeinto autocomplete
// send a call to the database and retreive the information for the user questions

class UserReport extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         showUserReport: false,
         hideRightCaret: true,
         hideDownCaret: false,
         userQuestions: [],
      };
   }

   /* user id, display one name and with user id match all questions and answers  */

   componentDidMount() {
      axios
         .get("/api/v1/users")
         .then((res) => {
            // handle success
            console.log(res);
            const userQuestions = res.data;
            this.setState({ userQuestions: userQuestions });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
      axios
         .get("/api/v1/user-questions")
         .then((res) => {
            // handle success
            console.log(res);
            const userQuestions = res.data;
            this.setState({ userQuestions: userQuestions });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   toggleAssignedQuestions() {
      // click on right caret - hides right caret shows down caret and questions

      this.setState({
         showUserReport: !this.state.showUserReport,
         hideRightCaret: !this.state.hideRightCaret,
         hideDownCaret: !this.state.hideDownCaret,
      });
   }

   render() {
      console.log(this.state.userQuestions);
      return (
         <div className="container">
            <div className="row">
               <div className="col-12">
                  <Navigation />
                  <input
                     className="form-control mb-4"
                     type="text"
                     placeholder="Type user name to search"
                  ></input>
                  <div className="card">
                     <div className="card-body">
                        {/* toggle when click icon next to user show assigned questions */}

                        {this.state.hideRightCaret && (
                           <img
                              src={caretRightIcon}
                              style={{}}
                              alt=""
                              onClick={() => {
                                 this.toggleAssignedQuestions();
                              }}
                           />
                        )}

                        {this.state.hideDownCaret && (
                           <img
                              src={caretDownIcon}
                              style={{}}
                              alt=""
                              onClick={() => {
                                 this.toggleAssignedQuestions();
                              }}
                           />
                        )}

                        <h3 className="d-inline">User Report</h3>

                        {this.state.showUserReport && (
                           <form className="mt-2">
                              {this.state.userQuestions.map((user, i) => {
                                 return (
                                    <div key={user.user_id + i}>
                                       <h3>{user.first_name} </h3>
                                       <h3>{user.last_name} </h3>
                                       <h3>{user.question_title} </h3>
                                       <h3>{user.user_answer_text}</h3>
                                    </div>
                                 );
                              })}
                           </form>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      userQuestions: state.userQuestions,
   };
}
export default connect(mapStateToProps)(UserReport);
