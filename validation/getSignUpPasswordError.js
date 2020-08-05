module.exports = function getSignUpEmailError(password, email) {
   if (password === "") {
      return "Please create a password";
   }
   if (password.length < 9) {
      return "Your password must be at least 9 characters.";
   }
   if (checkForLocalPart(password, email)) {
      return "Your password cannot contain the local part of the email";
   }
   const uniqPasswordInputChars = [...new Set(password)];
   if (uniqPasswordInputChars.length < 3) {
      return "Password must contain at least 3 unique characters.";
   }
   return "";
};

function checkForLocalPart(password, email) {
   const localPart = email.split("@")[0];
   // allows for less than four common characters in the email input and the password input
   if (localPart.length < 4) return false;
   else return password.includes(localPart);
}
