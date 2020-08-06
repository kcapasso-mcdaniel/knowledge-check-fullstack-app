module.exports = function getSignUpFirstNameError(lastName) {
   if (lastName === "") {
      return "Field cannot be left blank";
   }
   return "";
};
