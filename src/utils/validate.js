export const checkValidData = (email, password, name) => {
     const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);//it will return true or false for valid mail
     const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);//it will return true or false for valid password
     const isNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);
     if(!isEmailValid) return "Email Id is not valid";
     if(!isPasswordValid) return "Invalid Password!";
     if(!isNameValid) return "Invalid UserName";
     //if both password and email is valid return null => that means no error
     return null;
};