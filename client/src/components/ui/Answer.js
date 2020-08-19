import React from "react";

export default class Answer extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         addNewAnswer: true,
         deleteAnswer: true,
      };
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
               <div className="row mt-2">
                  <div className="col-sm-3">
                     <label
                        htmlFor={this.props.id}
                        className="col-form-label mr-2 text-secondary"
                     >
                        Incorrect Answer
                     </label>
                  </div>
                  <div className="col-sm-7">
                     <input
                        type="text"
                        className="form-control"
                        id={this.props.id}
                        defaultValue={this.props.defaultValue}
                        onChange={(e) => {
                           this.props.setAnswerText(
                              this.props.id,
                              e.target.value
                           );
                        }}
                     />
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
