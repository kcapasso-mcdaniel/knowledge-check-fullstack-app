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
            correctAnswer: {}, //update when user selects correct answer
            incorrectAnswers: [],
            assignees: [],
         },
         answerFields: [],
      };
      // pass function through children - this refer to create question
      this.setAnswerText = this.setAnswerText.bind(this);
   }

   setAnswerId() {
      const question = cloneDeep(this.state.question);
      const answerId = getUuid();
      const answer = { id: answerId };
      question.incorrectAnswers.push(answer);
      // updating question state
      this.setState({ question });
   }

   setAnswerText(answerId, text) {
      const question = cloneDeep(this.state.question);
      const answer = question.incorrectAnswers.find((answer) => {
         return answer.id === answerId;
      });
      console.log(answer);
      answer.text = text;
      this.setState({ question });
   }

   // Correct Answer

   setCorrectAnswerId() {
      const question = cloneDeep(this.state.question);
      const correctAnswerId = getUuid();
      const answer = { id: correctAnswerId };
      question.correctAnswer.push(answer);
      // updating question state
      this.setState({ question });
   }

   setCorrectAnswerText(correctAnswerId, text) {
      const question = cloneDeep(this.state.question);
      const answer = question.correctAnswer.find((answer) => {
         return answer.id === correctAnswerId;
      });
      console.log(answer);
      answer.text = text;
      this.setState({ question });
   }

   saveCorrectAnswer() {
      console.log("clicked");
      // const correctAnswer = correctAnswerId, correctAnswerText
      // new id for the correct answer
      // save the text for the answer
   }

   // Console.log a question object on Create a Question page
   // Send this question object to the server
   // Store the values into 3 tables in your MySQL DB: questions, answers, xref_user_questions

   setDeleteAnswer() {
      //  need the index and the id of the answer being deleted in order to remove
      // const question = cloneDeep(this.state.question);
   }

   createQuestion() {
      // both questionInput and correctAnswerInput need an id
      const questionTitle = document.getElementById("question-input").value;
      console.log(questionTitle);
      const correctAnswerInput = document.getElementById("correct-answer-input")
         .value;
      console.log(correctAnswerInput);
      const question = {
         id: getUuid(),
         title: questionTitle,
         createdByUserId: this.state.createdByUserId,
         correctAnswer: correctAnswerInput,
         incorrectAnswers: [],
         createOn: Date.now(),
      };

      console.log(question);
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
                        />
                     </div>
                     <div className="col-sm-2">
                        <button
                           className="btn-sm btn-primary btn-block mb-2"
                           type="button"
                           id="save-answer"
                           onClick={() => this.saveCorrectAnswer()}
                        >
                           Save
                        </button>
                     </div>
                  </div>
                  {/* change to Answer */}
                  {this.state.question.incorrectAnswers.map((answer) => {
                     return (
                        <Answer
                           key={answer.id}
                           id={answer.id}
                           setAnswerText={this.setAnswerText}
                        />
                     );
                  })}
                  <div className="row">
                     <div className="col-sm-12">
                        <button
                           type="button"
                           className="btn-lg btn-success"
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
