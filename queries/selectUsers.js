module.exports = function selectUsers() {
   return `
          SELECT 
             id, first_name, last_name
          FROM 
             users
      `;
};
