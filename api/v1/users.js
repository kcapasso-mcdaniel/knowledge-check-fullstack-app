// Resource file
// express
const express = require("express");
const router = express.Router();
const db = require("../../db");

// change file paths
const selectUser = require("../../queries/selectUser");
const insertUser = require("../../queries/insertUser");
const { toJson, toSafelyParseJson, toHash } = require("../../utils/helpers");

// @route  GET api/v1/users
// @desc  GET a valid user via email and password
// @access PUBLIC

// can run a query
router.get("/", (req, res) => {
   db.query(selectUser("kate@gmail.com", "replace_me")) // use our database to call the query method which opens connection & pass connection
      .then((dbRes) => {
         // then get something successful can console.log user
         // returns an array of object that contains the information about the user
         const user = toSafelyParseJson(toJson(dbRes))[0];
         console.log(user);
         res.json(user);
      })
      .catch((err) => {
         // catch if there is a database error and throw error message
         console.log(err);
         res.status(400).json(err);
      });
});

// @route  POST api/v1/users
// @desc  Create a valid user
// @access PUBLIC

router.post("/", async (req, res) => {
   const user = {
      id: req.body.id,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      password: await toHash(req.body.password),
      created_at: req.body.createdAt,
   };
   // call insertUser query and pass the object that we created with the values
   db.query(insertUser, user)
      .then((dbRes) => {
         console.log(dbRes);
         // return user data so can put in redux store
      })
      .catch((err) => {
         console.log(err);
         // return 400 error
      });
});

module.exports = router;
