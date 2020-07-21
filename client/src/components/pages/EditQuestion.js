import React from "react";
import Navigation from "../ui/Navigation";
import Answer from "../ui/Answer";
// import Question from "../ui/Question";
import { withRouter } from "react-router-dom";
import { v4 as getUuid } from "uuid";
import { connect } from "react-redux";
import cloneDeep from "lodash/cloneDeep";

// edit question populated on page from AssignQuestion
// for each answer created generate a new id for the answer
// on click save log an object with the question and each answer
// on click delete question refresh the page and clear the inputs

class EditQuestion extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         numOfAnswers: 0,
         isAnswerDisplayed: true,
         editableQuestion: {},
         filteredQuestion: [],
         question: {
            id: getUuid(),
            createdByUserId: this.props.currentUser.id,
            title: "", // update when user types into title input
            correctAnswerId: "", //update when user selects correct answer
            answers: [],
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

   render() {
      return (
         <div className="container">
            <div className="row">
               <div className="col-12">
                  <Navigation />
                  <div className="form-group">
                     <label htmlFor="form-control">Question</label>
                     <input
                        type="text"
                        className="form-control"
                        id="question-input"
                        defaultValue={this.props.editableQuestion.title}
                     />
                  </div>
                  {/* for every answer render the answer component */}
                  <div className="col-sm-12">
                     {/* local state to initialize manipulate copy  */}
                  </div>
                  {this.props.editableQuestion.answers.map((answer) => {
                     console.log(answer.text);
                     return (
                        <Answer
                           key={answer.id}
                           id={answer.id}
                           setAnswerText={this.setAnswerText}
                           defaultValue={answer.text}
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
                           Add Answer
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
      questions: state.questions,
      editableQuestion: state.editableQuestion,
   };
}

export default withRouter(connect(mapStateToProps)(EditQuestion));
