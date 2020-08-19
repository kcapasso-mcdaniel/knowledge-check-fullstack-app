import React from "react";
import Navigation from "../ui/Navigation";
import Answer from "../ui/Answer";
// import Question from "../ui/Question";
import { withRouter } from "react-router-dom";
import { v4 as getUuid } from "uuid";
import { connect } from "react-redux";
import cloneDeep from "lodash/cloneDeep";

class CreateQuestion extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         numOfAnswers: 0,
         isAnswerDisplayed: true,
         question: {
            id: getUuid(),
            createdByUserId: this.props.currentUser.id,
            title: "", // update when user types into title input
            correctAnswerId: "", //update when user selects correct answer
            answers: [],
            assignees: [],
            createdOn: Date.now(),
         },
         answerFields: [],
         correctAnswer: {
            id: getUuid(),
            text: "",
         },
      };
      // pass function through children - this refer to create question
      this.setAnswerText = this.setAnswerText.bind(this);
   }

   setAnswerId() {
      const question = cloneDeep(this.state.question);
      const answerId = getUuid();
      const answer = { id: answerId };
      question.answers.push(answer);
      // updating question state
      this.setState({ question });
   }

   setAnswerText(answerId, text) {
      const question = cloneDeep(this.state.question);
      const answer = question.answers.find((answer) => {
         return answer.id === answerId;
      });
      console.log(answer);
      answer.text = text;
      this.setState({ question });
   }

   // Console.log a question object on Create a Question page
   // Send this question object to the server
   // Store the values into 3 tables in your MySQL DB: questions, answers, xref_user_questions

   createQuestion() {
      const question = cloneDeep(this.state.question);

      const correctAnswer = this.state.correctAnswer;
      // if this.state.correctAnswer.id === an id that is already in the array
      if (correctAnswer.id === question.answers.id) {
         // then update the text
         console.log("true");
         return true;
      } else {
         // else add it to the array
         // add correctAnswer to the answers[] push object into array
         question.answers.push(correctAnswer);
      }

      // add this.state.correctAnswer.id to this.state.question.correctAnswerId
      question.correctAnswerId = correctAnswer.id;

      // set State
      this.setState({ question });

      // POST to server API
      // post to API
      // axios
      //    .post("/api/v1/questions")
      //    .then(() => {})
      //    .catch(() => {});
   }

   setTitle(e) {
      const question = cloneDeep(this.state.question);
      question.title = e.target.value;
      this.setState({ question });
   }

   setCorrectAnswer(e) {
      const correctAnswer = cloneDeep(this.state.correctAnswer);
      correctAnswer.text = e.target.value;
      this.setState({ correctAnswer });
   }

   render() {
      return (
         <div className="container">
            <div className="row">
               <div className="col-12">
                  <Navigation />
                  <div className="form-group">
                     <label htmlFor="formGroupExampleInput">
                        <b>Question</b>
                     </label>
                     <input
                        type="text"
                        className="form-control"
                        id="question-input"
                        onChange={(e) => {
                           this.setTitle(e);
                        }}
                     />
                  </div>
                  <div className="row">
                     <div className="col-sm-3 mb-2">
                        <label
                           htmlFor="correct-answer-input"
                           className="text-dark"
                        >
                           <b>Correct Answer</b>
                        </label>
                     </div>
                     <div className="col-sm-7">
                        <input
                           type="text"
                           className="form-control"
                           id="correct-answer-input"
                           onChange={(e) => {
                              this.setCorrectAnswer(e);
                           }}
                        />
                     </div>
                  </div>

                  {this.state.question.answers.map((answer) => {
                     return (
                        <Answer
                           key={answer.id}
                           id={answer.id}
                           setAnswerText={this.setAnswerText}
                        />
                     );
                  })}
                  <div className="row">
                     <div className="col-12 mt-2">
                        <button
                           type="button"
                           className="btn-sm btn-success"
                           onClick={() => {
                              this.setAnswerId();
                           }}
                        >
                           Add Incorrect Answer
                        </button>
                     </div>
                  </div>
                  <div className="row mt-4">
                     <div className="col-sm-6">
                        <button
                           type="button"
                           className="btn-lg btn-warning btn-block"
                           // onClick={() => {
                           //    this.deleteTheQuestion();
                           // }}
                        >
                           Delete Question
                        </button>
                     </div>
                     <div className="col-sm-6">
                        <button
                           type="button"
                           className="btn-lg btn-primary btn-block float-right"
                           onClick={() => {
                              this.createQuestion();
                           }}
                        >
                           Save Question
                        </button>
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
      currentUser: state.currentUser,
   };
}

export default withRouter(connect(mapStateToProps)(CreateQuestion));
