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
         userResults: [],
      };
   }

   componentDidMount() {
      // will equal res.json

      axios
         .get("/api/v1/user-questions")
         .then((res1) => {
            // handle success
            console.log(res1);
            let userQuestions = res1.data;

            axios
               .get("/api/v1/all-users")
               .then((res) => {
                  // handle success
                  const users = res.data.map((user) => {
                     return {
                        id: `${user.id}`,
                        name: `${user.first_name} ${user.last_name}`,
                        questions: userQuestions
                           .filter(
                              (userQuestion) => userQuestion.user_id === user.id
                           )
                           .map((userAnswer) => {
                              console.log("NO", userAnswer);
                              return {
                                 question: userAnswer.question_title,
                                 answer: userAnswer.user_answer_text,
                              };
                           }),
                     };
                  });
                  console.log(users);
                  this.setState({ userResults: users });
               })
               .catch((error) => {
                  // handle error
                  console.log(error);
               });
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
                              {this.state.userResults.map((user, i) => {
                                 return (
                                    <div key={user.id + i}>
                                       <h3>{user.name} </h3>
                                       {user.questions.map((question, i) => {
                                          return (
                                             <div key={question.question + i}>
                                                <h3>{question.question} </h3>
                                                <h3>{question.answer}</h3>
                                             </div>
                                          );
                                       })}

                                       {/* user id, display one name and with user id match all questions and answers  */}
                                       {/* <ul>
                                          <UserQuestions
                                             questions={user.questions}
                                             key={user.id}
                                          />
                                       </ul> */}
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
