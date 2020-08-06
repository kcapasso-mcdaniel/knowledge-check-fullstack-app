const selectUserById = `
    SELECT 
        id, first_name, last_name, email, created_at
    FROM
        users
    WHERE
        id = ?
    LIMIT 1;
`;
module.exports = selectUserById;
