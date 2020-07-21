import React from "react";

class Question extends React.Component {
   render() {
      const props = this.props;
      // console.log("question", props.title);
      return (
         <div className="col-12">
            {/* rendering the title of the question on the page */}
            <h3 className="d-inline">{props.title}</h3>
            {/* iterating over the data and rendering the answers on the page */}
            {props.answers.map((answer) => (
               <div
                  className="custom-control custom-radio mt-4"
                  key={answer.id}
               >
                  <input
                     type="radio"
                     name={props.id}
                     // ^ this is the question id
                     id={answer.id}
                     value={answer.id}
                     className="custom-control-input"
                     onChange={(e) => {
                        this.props.setUserAnswer(e);
                     }}
                  />
                  <label
                     className="custom-control-label mb-4"
                     htmlFor={answer.id}
                  >
                     {answer.text}
                  </label>
               </div>
            ))}
         </div>
      );
   }
}

export default Question;
