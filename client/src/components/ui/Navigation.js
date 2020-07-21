import React from "react";
import { Link } from "react-router-dom";
import headerIcon from "../../icons/header-check.svg";
import { connect } from "react-redux";
import actions from "../../store/actions";

class Navigation extends React.Component {
   logOutCurrentUser() {
      this.props.dispatch({ type: actions.UPDATE_CURRENT_USER, payload: {} });
   }

   render() {
      const url = window.location.pathname;
      const tabActiveOnAssignQuestion = (url) => {
         // if url contains this string highlight tab accordingly
         if (url.indexOf("assign-question") > 0) {
            console.log("this tab is active");
            return "tab-active";
         } else return "";
      };
      const tabActiveOnCreateQuestion = (url) => {
         // if url contains this string highlight tab accordingly
         if (
            url.indexOf("create-question") > 0 ||
            url.indexOf("edit-question") > 0
         ) {
            console.log("this tab is active");
            return "tab-active";
         } else return "";
      };
      const tabActiveOnUserReport = (url) => {
         // if url contains this string highlight tab accordingly
         if (url.indexOf("user-report") > 0) {
            console.log("this tab is active");
            return "tab-active";
         } else return "";
      };
      const tabActiveOnAssignedToMe = (url) => {
         // if url contains this string highlight tab accordingly
         if (url.indexOf("assigned-to-me") > 0) {
            console.log("this tab is active");
            return "tab-active";
         } else return "";
      };

      return (
         <>
            <div className="col-12 offset-4">
               <h2 className="d-inline ml-2 mb-2">Knowledge</h2>
               <img
                  src={headerIcon}
                  alt=""
                  style={{ marginLeft: "6px", marginBottom: "6px" }}
               />
            </div>
            <div
               className="btn-group d-flex mt-1 mb-5"
               role="navigation"
               aria-label="navigation"
            >
               <Link
                  to="/assign-question"
                  type="button"
                  className={`btn ${tabActiveOnAssignQuestion(url)}`}
               >
                  Assign Question
               </Link>

               <Link
                  to="/create-question"
                  type="button"
                  className={`btn tab-separator ${tabActiveOnCreateQuestion(
                     url
                  )}`}
               >
                  Create Question
               </Link>

               <Link
                  to="/user-report"
                  type="button"
                  className={`btn tab-separator ${tabActiveOnUserReport(url)}`}
               >
                  User Report
               </Link>
               {/* {`btn btn-secondary ${tabActiveOnCreate(url)}`} */}
               <Link
                  to="/assigned-to-me"
                  type="button"
                  className={`btn tab-separator ${tabActiveOnAssignedToMe(
                     url
                  )}`}
               >
                  Assigned To Me
               </Link>
               {/* {`btn btn-secondary ${tabActiveOnCreate(url)}`} */}
               <Link
                  to="/"
                  type="button"
                  className="btn tab-separator"
                  onClick={() => {
                     this.logOutCurrentUser();
                  }}
               >
                  Log Out
               </Link>
            </div>
         </>
      );
   }
}
function mapStateToProps(state) {
   return {};
}

export default connect(mapStateToProps)(Navigation);
