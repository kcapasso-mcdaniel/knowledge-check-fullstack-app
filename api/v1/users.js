// Resource file
// express
const express = require("express");
const router = express.Router();
const db = require("../../db");

// change file paths

const insertUser = require("../../queries/insertUser");
const selectUserById = require("../../queries/selectUserById");
const { toHash } = require("../../utils/helpers");
const getSignUpEmailError = require("../../validation/getSignUpEmailError");
const getSignUpPasswordError = require("../../validation/getSignUpPasswordError");
const getSignUpFirstNameError = require("../../validation/getSignUpFirstNameError");
const getSignUpLastNameError = require("../../validation/getSignUpLastNameError");

// @route  POST api/v1/users
// @desc  Create a valid user
// @access PUBLIC

router.post("/", async (req, res) => {
   // making variables and assigning to req.body
   const { id, firstName, lastName, email, password, createdAt } = req.body;
   const emailError = await getSignUpEmailError(email);
   const passwordError = getSignUpPasswordError(password, email);
   const firstNameError = getSignUpFirstNameError(firstName);
   const lastNameError = getSignUpLastNameError(lastName);
   let dbError = "";
   if (
      firstNameError === "" &&
      lastNameError === "" &&
      emailError === "" &&
      passwordError === ""
   ) {
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
         .then(() => {
            // we get the id from the req.body
            db.query(selectUserById, id)
               .then((users) => {
                  const user = users[0];
                  res.status(200).json({
                     id: user.id,
                     firstName: user.first_name,
                     lastName: user.last_name,
                     email: user.email,
                     createdAt: user.created_at,
                  });
               })
               .catch((err) => {
                  console.log(err);
                  dbError = `${err.code} ${err.sqlMessage}`;
                  res.status(400).json({ dbError });
               });
         })
         .catch((err) => {
            console.log(err);
            // return 400 error to user
            dbError = `${err.code} ${err.sqlMessage}`;
            res.status(400).json({ dbError });
         });
   } else {
      res.status(400).json({
         firstNameError: firstNameError,
         lastNameError: lastNameError,
         emailError: emailError,
         passwordError: passwordError,
      });
   }
});

module.exports = router;
