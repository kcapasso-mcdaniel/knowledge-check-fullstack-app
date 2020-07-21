// Resource file
// express
const express = require("express");
const router = express.Router();
const db = require("../../db");

// change file paths
const returnUserQuestions = require("../../queries/returnUserQuestions");

// @route  GET api/v1/users
// @desc  GET a valid user via email and password
// @access PUBLIC

// can run a query
router.get("/", (req, res) => {
   console.log(req.query);
   // const userId = req.query.userId;
   db.query(returnUserQuestions()) // use our database to call the query method which opens connection & pass connection
      .then((dbRes) => {
         // then get something successful can console.log user questions
         console.log(dbRes);
         res.json(dbRes);
      })
      .catch((err) => {
         // catch if there is a database error and throw error message
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
