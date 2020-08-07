module.exports = function getLoginFirstNameError(firstName) {
   if (firstName === "") {
      return "Field cannot be left blank";
   }
   return "";
};
