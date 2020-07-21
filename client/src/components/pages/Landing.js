import React from "react";
import checkIcon from "../../icons/landing-check.svg";
import SignUp from "../ui/SignUp";
import LogIn from "../ui/LogIn";

export default function Landing() {
   return (
      <div className="background-image">
         <div className="container">
            <div className="row">
               <div className="col-12 mt-4">
                  <h1 className="d-inline">Knowledge</h1>
                  <img
                     src={checkIcon}
                     alt=""
                     style={{
                        marginLeft: "8px",
                        marginBottom: "8px",
                     }}
                  />
               </div>

               <LogIn />
               <SignUp />
            </div>
         </div>
      </div>
   );
}
