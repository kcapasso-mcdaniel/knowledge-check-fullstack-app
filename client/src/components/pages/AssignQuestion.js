import React from "react";
import Navigation from "../ui/Navigation";
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";

// TODO LIST FOR MVP
// change input to select and allow user to assign one question

class AssignQuestion extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         questionsToAssign: [], // use the questions data here because it is a general list of questions to be assigned
         clickedTheEditButton: false,
      };
   }

   componentDidMount() {
      axios
         .get(
            "https://raw.githubusercontent.com/kcapasso-mcdaniel/knowledge-check-fullstack-app/master/client/src/data/mock-data-json/questions.json"
         )
         .then((res) => {
            // handle success
            // console.log(res);
            const questions = res.data;
            console.log(res.data);
            this.setState({ questionsToAssign: questions });
            this.props.dispatch({
               //dispatch actions takes type and payload
               type: actions.STORE_QUESTIONS,
               payload: questions,
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   // onClick Edit button - populate question on create-question page to edit
   // send the question with it
   editTheQuestion(id) {
      const editableQuestion = this.state.questionsToAssign.filter(
         (question) => {
            return question.id === id;
         }
      )[0];
      console.log("filter", editableQuestion);
      this.props.dispatch({
         type: actions.STORE_EDITABLE_QUESTION,
         payload: editableQuestion,
      });
      this.props.history.push("/edit-question/" + id);
   }

   goToCreateQuestion() {
      this.props.history.push("/create-question");
   }

   assignTheQuestion() {
      console.log("clicked");
   }

   render() {
      return (
         <div className="container">
            <div className="row">
               <div className="col-12">
                  <Navigation />
                  <div className="row">
                     <div className="col-12 ml-6">
                        {this.state.questionsToAssign.map((question) => {
                           return (
                              <>
                                 <p key={question.id}>{question.title} </p>

                                 <div className="row">
                                    <div className="col-8 mb-4">
                                       <select className="w-50 mt-4 py-2">
                                          <option>Select User</option>
                                          <option>Kate Capasso</option>
                                          <option>Brandon McDaniel</option>
                                          <option>Sally Smith</option>
                                       </select>

                                       <div className="col-2 d-inline">
                                          <button
                                             className="btn-sm btn-warning mt-2"
                                             type="button"
                                             onClick={() => {
                                                this.assignTheQuestion();
                                             }}
                                          >
                                             Assign
                                          </button>
                                       </div>
                                       <div className="col-2 d-inline">
                                          <button
                                             className="btn-sm btn-danger mt-2"
                                             type="button"
                                             onClick={() => {
                                                this.editTheQuestion(
                                                   question.id
                                                );
                                             }}
                                          >
                                             Edit
                                          </button>
                                       </div>
                                    </div>
                                 </div>
                              </>
                           );
                        })}
                        <div className="col-6">
                           <button
                              className="btn-lg btn-success mt-2"
                              onClick={() => this.goToCreateQuestion()}
                           >
                              Create New
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   //take the global state and map certain things to these properties in local state
   return {
      questions: state.questions,
   };
}
export default connect(mapStateToProps)(AssignQuestion);
