const db = require("../db");
const selectUserByEmail = require("../queries/selectUserByEmail");
const bcrypt = require("bcrypt");

module.exports = async function getLoginPasswordError(password, email) {
   if (password === "") {
      return "Please enter your password";
   }
   if ((await checkIsValidUser(email, password)) === false) {
      return "The email and password combination you entered is invalid.";
   }
   return "";
};

function checkIsValidUser(email, password) {
   // get the user by email address
   return db
      .query(selectUserByEmail, email)
      .then(async (users) => {
         const user = users[0];
         const IsValidUser = await bcrypt
            // user.password is the hashed password in db
            .compare(password, user.password)
            .then((IsValidUser) => {
               return IsValidUser;
            })
            .catch((err) => {
               console.log(err);
            });
         return IsValidUser;
      })
      .catch((err) => {
         return false;
      });
}
