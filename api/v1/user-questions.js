// Resource file
// express
const express = require("express");
const router = express.Router();
const db = require("../../db");

// change file paths

const returnUserReport = require("../../queries/returnUserReport");

// @route  GET api/v1/users
// @desc  GET a valid user via email and password
// @access PUBLIC

// can run a query
router.get("/", (req, res) => {
   console.log(req.query);
   // const userId = req.query.userId;
   db.query(returnUserReport()) // use our database to call the query method which opens connection & pass connection
      .then((userAnsweredQuestions) => {
         // then get something successful can console.log user questions
         console.log(userAnsweredQuestions);
         res.json(userAnsweredQuestions);
         // .then((userAnsweredQuestions) => {
         //    // then get something successful can console.log user questions
         //    console.log(userAnsweredQuestions);
         //    const camelCaseQuestions = userAnsweredQuestions.map(
         //       (userAnsweredQuestion) => {
         //          return {
         //             userId: userAnsweredQuestion.user_id,
         //             firstName: userAnsweredQuestion.first_name,
         //             lastName: userAnsweredQuestion.last_name,
         //             questionId: userAnsweredQuestion.question_id,
         //             questionTitle: userAnsweredQuestion.question_title,
         //             userAnswerId: userAnsweredQuestion.user_answer_id,
         //             userAnswerText: userAnsweredQuestion.user_answer_text,
         //          };
         //       }
         //    );
         //    console.log(camelCaseQuestions);
         //    res.json(camelCaseQuestions);
      })
      .catch((err) => {
         // catch if there is a database error and throw error message
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
