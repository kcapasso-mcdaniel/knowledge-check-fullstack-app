import React from "react";
import Navigation from "../ui/Navigation";
import Question from "../ui/Question";
// import userQuestions from "../../data/user-questions";
// import find from "lodash/find";
import axios from "axios";
import { connect } from "react-redux";

// on click Submit - submit the form for the quiz and log and object with the user and the answers
// use userquestions and change how it sent to the question component

class AssignedToMe extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         currentUser: [],
      };
      this.setUserAnswer = this.setUserAnswer.bind(this);
   }

   componentDidMount() {
      axios
         .get(
            "https://raw.githubusercontent.com/kcapasso-mcdaniel/first-react-app/master/src/data/mock-data-json/user-questions.json"
         )
         .then((res) => {
            // handle success
            const userQuestions = res.data[0];
            // object with a collection of data
            console.log(userQuestions);
            this.setState({ currentUser: userQuestions });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   submitUserAnswers() {
      console.log(this.state.currentUser);
   }

   // Function finds the id of the question and returns the user's answer associated with that question id

   setUserAnswer(e) {
      // console.log("test", e.target.value);

      const questionId = e.target.name;
      const answerId = e.target.id;
      const user = { ...this.state.currentUser };
      // console.log("what", user);

      // returns only the first question in the array that matches the criteria
      // const filteredQuestions = user.questions.filter((question) => {
      //    return question.id === questionId;
      // });

      // // pulls the question out of the object starting at the first index
      // const question = filteredQuestions[0];

      // use the JavaScript find method
      const question = user.questions.find((question) => {
         return question.id === questionId;
      });

      // set the userAnswerId property of question to the target answer id
      question.userAnswerId = answerId;
      // console.log("answer", question);

      // returns index of the element function is invoked on
      const indexOfQuestion = user.questions.findIndex((question) => {
         return question.id === questionId;
      });
      console.log("testy", indexOfQuestion);

      // set the state to user
      user.questions[indexOfQuestion].userAnswerId = answerId;
      this.setState({ currentUser: user });
   }

   render() {
      return (
         <div className="container">
            <div className="row">
               <div className="col-12">
                  <Navigation />
                  <div className="col-12">
                     <form className="mt-8">
                        {this.state.currentUser.questions &&
                           this.state.currentUser.questions.map((question) => {
                              // console.log(question.id, question.title);
                              return (
                                 <Question
                                    title={question.title}
                                    answers={question.answers}
                                    key={question.id}
                                    id={question.id}
                                    setUserAnswer={this.setUserAnswer}
                                 />
                              );
                           })}

                        <button
                           type="submit"
                           className="btn-lg btn-primary mt-4 ml-4"
                           onClick={() => {
                              this.submitUserAnswers();
                           }}
                        >
                           Submit
                        </button>
                     </form>
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
export default connect(mapStateToProps)(AssignedToMe);
