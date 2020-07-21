import React from "react";

// need to add state

class UserQuestions extends React.Component {
   render() {
      const props = this.props;
      console.log("I am the props", props);

      return (
         <div className="col-12">
            {/* rendering the title of the question on the page */}
            <h3 className="d-inline">
               {props.questions.map((question) => {
                  return <p key={question.id}>{question.title} </p>;
               })}
            </h3>
         </div>
      );
   }
}

export default UserQuestions;
