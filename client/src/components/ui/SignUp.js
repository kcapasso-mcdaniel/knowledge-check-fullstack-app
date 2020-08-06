import React from "react";
import classnames from "classnames";
import { v4 as getUuid } from "uuid";
import { withRouter } from "react-router-dom";
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";

class SignUp extends React.Component {
   constructor(props) {
      super(props);
      console.log("In a new class component");
      this.state = {
         isDisplayingSignUpForm: true,
         firstNameError: "",
         lastNameError: "",
         emailError: "",
         passwordError: "",
         hasEmailError: false,
         hasPasswordError: false,
      };
   }

   displayTheInputs() {
      this.setState({ isDisplayingSignUpForm: true });
      this.props.history.push("/assign-question");
   }

   // user object created after submission validation is performed
   async validateAndSignUpUser() {
      //    get the value of the first name
      const userFirstNameInput = document.getElementById("user-first-name")
         .value;
      //    get the value of the last name
      const userLastNameInput = document.getElementById("user-last-name").value;
      //   get the value of the user email input
      const signUpUserEmailInput = document.getElementById(
         "signup-user-email-input"
      ).value;
      // get the value of the user password input
      const signUpUserPasswordInput = document.getElementById(
         "signup-user-password-input"
      ).value;

      // user object requirements
      const user = {
         id: getUuid(),
         firstName: userFirstNameInput,
         lastName: userLastNameInput,
         email: signUpUserEmailInput,
         password: signUpUserPasswordInput,
         createdAt: Date.now(),
      };
      console.log("create user to POST", user);
      // post to API
      axios
         .post("/api/v1/users", user)
         // on success
         .then((res) => {
            console.log(res.data);
            // update currentUser in Global State
            this.props.dispatch({
               type: actions.UPDATE_CURRENT_USER,
               payload: res.data,
            });
            //go to next page:
            this.props.history.push("/assign-question");
         })
         .catch((err) => {
            const { data } = err.response;
            console.log(data);
            const {
               firstNameError,
               lastNameError,
               emailError,
               passwordError,
            } = data;
            if (firstNameError !== "") {
               this.setState({ firstNameError: firstNameError });
            }
            if (lastNameError !== "") {
               this.setState({ lastNameError: lastNameError });
            }
            if (emailError !== "") {
               this.setState({ hasEmailError: true, emailError });
            } else {
               this.setState({ hasEmailError: false, emailError });
            }
            if (passwordError !== "") {
               this.setState({ hasPasswordError: true, passwordError });
            } else {
               this.setState({ hasPasswordError: false, passwordError });
            }
         });
   }

   render() {
      return (
         <div className="col-xl-5 col-sm-6 col-12 mt-6">
            <div className="card">
               <div className="card-body">
                  <h2 className="card-title">New to the team?</h2>
                  <h3>Click below to sign up!</h3>

                  {/* validation form  */}
                  {this.state.isDisplayingSignUpForm && (
                     <div className="sign-up-form">
                        <label htmlFor="user-first-name">First Name</label>
                        <input
                           type="text"
                           className={classnames({
                              "form-control": true,
                              "is-invalid": this.state.firstNameError,
                           })}
                           id="user-first-name"
                        />
                        <p className="text-danger">
                           {this.state.firstNameError}
                        </p>
                        <label htmlFor="user-last-name">Last Name</label>
                        <input
                           type="text"
                           className={classnames({
                              "form-control": true,
                              "is-invalid": this.state.lastNameError,
                           })}
                           id="user-last-name"
                        />
                        <p className="text-danger">
                           {this.state.lastNameError}
                        </p>
                        <label htmlFor="signup-user-email-input">
                           Email Address
                        </label>
                        <input
                           type="email"
                           className={classnames({
                              "form-control": true,
                              "is-invalid": this.state.hasEmailError,
                           })}
                           id="signup-user-email-input"
                        />
                        <p className="text-danger">{this.state.emailError}</p>

                        <label htmlFor="signup-user-password-input">
                           Create password
                           <br />
                           <span className="text-muted">
                              Must be at least 9 characters
                           </span>
                        </label>
                        <input
                           type="password"
                           className={classnames({
                              "form-control": true,
                              "is-invalid": this.state.hasPasswordError,
                           })}
                           id="signup-user-password-input"
                        />
                        <p className="text-danger">
                           {this.state.passwordError}
                        </p>
                        <button
                           type="submit"
                           className="form-control btn btn-secondary mt-2"
                           id="go-time-button"
                           onClick={() => {
                              this.validateAndSignUpUser();
                           }}
                        >
                           Sign Up
                        </button>
                     </div>
                  )}

                  {/* not displaying form until on click and trigger display inputs function  */}
                  {!this.state.isDisplayingSignUpForm && (
                     <button
                        type="button"
                        className="form-control btn btn-primary mt-2"
                        id="sign-up-button"
                        onClick={() => {
                           this.displayTheInputs();
                        }}
                     >
                        Sign up
                     </button>
                  )}
               </div>
            </div>
         </div>
      );
   }
}
function mapStateToProps(state) {
   return {};
}

export default withRouter(connect(mapStateToProps)(SignUp));
