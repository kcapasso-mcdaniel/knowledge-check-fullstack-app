import React from "react";
import classnames from "classnames";
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";

// TODO LIST
// login and show a user logged in to the program

class LogIn extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         isDisplayingSignInForm: true,
         firstNameError: "",
         lastNameError: "",
         emailError: "",
         passwordError: "",
         hasEmailError: false,
         hasPasswordError: false,
      };
   }

   displaySignInInputs() {
      this.setState({ isDisplayingSignInForm: true });
   }

   async verifyAndLogUser() {
      //    get the value of the first name
      const userFirstNameInput = document.getElementById(
         "login-user-first-name"
      ).value;

      //    get the value of the last name
      const userLastNameInput = document.getElementById("login-user-last-name")
         .value;

      //   get the value of the user email input
      const logInUserEmailInput = document.getElementById(
         "login-user-email-input"
      ).value;
      // get the value of the user password input
      const logInUserPasswordInput = document.getElementById(
         "login-user-password-input"
      ).value;
      {
         const user = {
            firstName: userFirstNameInput,
            lastName: userLastNameInput,
            email: logInUserEmailInput,
            password: logInUserPasswordInput,
         };
         // console.log("Create user object to POST", user);
         // post to API
         axios
            .post("/api/v1/users/auth", user)
            .then((res) => {
               // set token in localStorage
               const authToken = res.data;
               localStorage.setItem("authToken", authToken);
               const user = jwtDecode(authToken);
               this.props.dispatch({
                  type: actions.UPDATE_CURRENT_USER,
                  payload: user,
               });
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
   }

   render() {
      return (
         <div className="col-xl-5 col-sm-6 col-12 mt-6">
            <div className="card">
               <div className="card-body">
                  <h2 className="card-title">Welcome Back!</h2>

                  {this.state.isDisplayingSignInForm && (
                     <div className="sign-in-form">
                        <h3>Time to check your knowledge!</h3>
                        <label htmlFor="login-user-first-name">
                           First Name
                        </label>
                        <input
                           type="text"
                           className={classnames({
                              "form-control": true,
                              "is-invalid": this.state.firstNameError,
                           })}
                           id="login-user-first-name"
                        />
                        <p className="text-danger">
                           {this.state.firstNameError}
                        </p>
                        <label htmlFor="login-user-last-name">Last Name</label>
                        <input
                           type="text"
                           className={classnames({
                              "form-control": true,
                              "is-invalid": this.state.lastNameError,
                           })}
                           id="login-user-last-name"
                        />
                        <p className="text-danger">
                           {this.state.lastNameError}
                        </p>
                        <label htmlFor="login-user-email-input">
                           Email Address
                        </label>
                        <input
                           type="email"
                           className={classnames({
                              "form-control": true,
                              "is-invalid": this.state.hasEmailError,
                           })}
                           id="login-user-email-input"
                        />
                        {this.state.hasEmailError && (
                           <p className={"text-danger"}>
                              {this.state.emailError}
                           </p>
                        )}

                        <label htmlFor="login-user-password-input">
                           Password
                        </label>
                        <input
                           type="password"
                           className={classnames({
                              "form-control": true,
                              "is-invalid": this.state.hasPasswordError,
                           })}
                           id="login-user-password-input"
                        />
                        {this.state.hasPasswordError && (
                           <p className={"text-danger"}>
                              {this.state.passwordError}
                           </p>
                        )}
                        <button
                           to="create-question"
                           type="submit"
                           className="form-control btn btn-secondary mt-2"
                           id="login-button"
                           onClick={() => {
                              this.verifyAndLogUser();
                           }}
                        >
                           Log in
                        </button>
                     </div>
                  )}

                  {!this.state.isDisplayingSignInForm && (
                     <button
                        type="button"
                        className="form-control btn btn-primary mt-2"
                        onClick={() => {
                           this.displaySignInInputs();
                        }}
                     >
                        Sign in
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

export default withRouter(connect(mapStateToProps)(LogIn));
