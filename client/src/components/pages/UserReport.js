import React from "react";
import Navigation from "../ui/Navigation";
import correctCheck from "../../icons/correct-check.svg";
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
         getUsersResults: [],
      };
   }

   componentDidMount() {
      // will equal res.json

      axios
         .get("/api/v1/user-questions")
         .then((userAnsweredQuestions) => {
            // handle success
            console.log("test", userAnsweredQuestions);
            let eachUserQuestion = userAnsweredQuestions.data;

            axios
               .get("/api/v1/all-users")
               .then((res) => {
                  // handle success
                  const users = res.data.map((user) => {
                     return {
                        id: `${user.id}`,
                        name: `${user.first_name} ${user.last_name}`,
                        questions: eachUserQuestion
                           .filter(
                              (userQuestion) => userQuestion.user_id === user.id
                           )
                           .map((userResults) => {
                              // console.log("NO", userResults);
                              return {
                                 question: userResults.question_title,
                                 answer: userResults.user_answer_text,
                              };
                           }),
                     };
                  });
                  console.log(users);
                  this.setState({ getUsersResults: users });
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
                        <form>
                           {this.state.getUsersResults.map((user, i) => {
                              return (
                                 <div key={user.id + i} className="mb-6">
                                    <h3 className="font-weight-bold">
                                       {user.name}{" "}
                                    </h3>
                                    {user.questions.map((question, i) => {
                                       return (
                                          <div key={question.question + i}>
                                             <h3>{question.question} </h3>
                                             <img
                                                src={correctCheck}
                                                alt=""
                                                width="24px"
                                                className=""
                                                style={{ marginBottom: "6px" }}
                                             ></img>
                                             <h3 className="text-primary ml-2 d-inline">
                                                {question.answer}
                                             </h3>
                                          </div>
                                       );
                                    })}
                                 </div>
                              );
                           })}
                        </form>
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
