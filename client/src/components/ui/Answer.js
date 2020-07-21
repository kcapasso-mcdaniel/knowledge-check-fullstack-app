import React from "react";

export default class Answer extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         addNewAnswer: true,
      };
   }

   saveAnswer() {
      // get the text from the input
      const text = document.getElementById(this.props.id).value;
      console.log(text);
      // add answer to the answers array inside of this.state.question
      this.props.setAnswerText(this.props.id, text);
   }

   // delete the input on the page
   deleteAnswer() {
      // remove current answer from the state of answerInputs
      // use pull possibly
      this.setState({ addNewAnswer: !this.state.addNewAnswer });
   }

   render() {
      return (
         <>
            {this.state.addNewAnswer && (
               <div className="row">
                  <div className="col-sm-2">
                     <label
                        htmlFor={this.props.id}
                        className="col-form-label mr-2"
                     >
                        Answer
                     </label>
                  </div>
                  <div className="col-sm-6">
                     <input
                        type="text"
                        className="form-control"
                        id={this.props.id}
                        defaultValue={this.props.defaultValue}
                     />
                  </div>
                  <div className="col-sm-2">
                     <button
                        className="btn-sm btn-primary btn-block mb-2"
                        type="button"
                        id="save-answer"
                        onClick={() => this.saveAnswer()}
                     >
                        Save
                     </button>
                  </div>
                  <div className="col-sm-2">
                     <button
                        className="btn-sm btn-danger btn-block mb-2"
                        type="button"
                        id="delete-answer"
                        onClick={() => this.deleteAnswer()}
                     >
                        Delete
                     </button>
                  </div>
               </div>
            )}
         </>
      );
   }
}
