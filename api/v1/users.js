// Resource file
// express
const express = require("express");
const router = express.Router();
const db = require("../../db");

// change file paths

const insertUser = require("../../queries/insertUser");
const { toHash } = require("../../utils/helpers");
const getSignUpEmailError = require("../../validation/getSignUpEmailError");
const getSignUpPasswordError = require("../../validation/getSignUpPasswordError");

// @route  POST api/v1/users
// @desc  Create a valid user
// @access PUBLIC

router.post("/", async (req, res) => {
   // making variables and assigning to req.body
   const { id, firstName, lastName, email, password, createdAt } = req.body;
   const emailError = await getSignUpEmailError(email);
   const passwordError = getSignUpPasswordError(password, email);
   if (emailError === "" && passwordError === "") {
      const user = {
         id: id,
         first_name: firstName,
         last_name: lastName,
         email: email,
         password: await toHash(password),
         created_at: createdAt,
      };
      // call insertUser query and pass the object that we created with the values
      db.query(insertUser, user)
         .then((dbRes) => {
            console.log(dbRes);
            // return user data so can put in redux store
         })
         .catch((err) => {
            console.log(err);
            // return 400 error to user
            res.status(400).json({
               emailError: emailError,
               passwordError: passwordError,
            });
         });
   } else {
      res.status(400).json({
         emailError: emailError,
         passwordError: passwordError,
      });
   }
});

module.exports = router;
