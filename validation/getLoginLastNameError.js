module.exports = function getLoginLastNameError(lastName) {
   if (lastName === "") {
      return "Field cannot be left blank";
   }
   return "";
};
