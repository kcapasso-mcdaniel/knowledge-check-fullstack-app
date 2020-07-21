module.exports = function returnUserQuestions() {
   return `
   SELECT 
         users.id AS user_id,
         users.first_name,
         users.last_name,
         questions.id AS question_id,
         questions.title AS question_title,
         answers.id AS user_answer_id,
         answers.text AS user_answer_text
    FROM
        users
             INNER JOIN
                 xref_user_questions ON user_id = users.id
             INNER JOIN 
                questions ON questions.id = xref_user_questions.question_id
             INNER JOIN 
                answers ON answers.id = xref_user_questions.user_answer_id
    WHERE 
       users.id = ? 
       
       `;
};
