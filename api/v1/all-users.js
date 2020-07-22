// Resource file
// express
const express = require("express");
const router = express.Router();
const db = require("../../db");

// change file paths
const selectUsers = require("../../queries/selectUsers");
const { toJson, toSafelyParseJson } = require("../../utils/helpers");

// @route  GET api/v1/users
// @desc  GET a valid user via email and password
// @access PUBLIC

// can run a query
router.get("/", (req, res) => {
   console.log(req.query);
   db.query(selectUsers()) // use our database to call the query method which opens connection & pass connection
      .then((dbRes) => {
         // then get something successful can console.log user
         // returns an array of object that contains the information about the user
         const user = toSafelyParseJson(toJson(dbRes));
         console.log(user);
         res.json(user);
      })
      .catch((err) => {
         // catch if there is a database error and throw error message
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
