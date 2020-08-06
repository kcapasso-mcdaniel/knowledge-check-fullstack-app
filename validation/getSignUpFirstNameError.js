module.exports = function getSignUpFirstNameError(firstName) {
   if (firstName === "") {
      return "Field cannot be left blank";
   }
   return "";
};
