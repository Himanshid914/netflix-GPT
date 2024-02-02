import { useState , useRef} from "react";
import { checkValidData } from "../utils/validate";
import Header from "./Header";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {  signInWithEmailAndPassword } from "firebase/auth";
//import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import {  BG_URL, PHOTOURL } from "../utils/constants";


const Login = () =>{
    const [isSignInForm, setIsSignInForm] =useState(true);
    const [errorMessage, setErrorMessage] = useState(null); 
    const dispatch = useDispatch();
   
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
   const handleButtonClick = () => {
       // Validate the form data => logic of this is in validate.js file in utils folder
      const message = checkValidData(email.current.value, password.current.value, name.current.value);
        setErrorMessage(message);  //console.log(email.current.value);
        if(message) return;
        //signIn/Signup Logic (message===null)
        if(!isSignInForm){
            //signup logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
               .then((userCredential) => {
                  // Signed up 
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name.current.value, photoURL:PHOTOURL
                  }).then(() => {
                    const {uid, email, displayName, photoURL} = auth.currentUser;
                    dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}));
                    
                    // Profile updated!
                    // ...
                  }).catch((error) => {
                    setErrorMessage(error.message);
                    // An error occurred
                    // ...
                  });
               
                                  // ...
                })
                .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+"-"+errorMessage);
                  // ..
                });
        }
        else{
            //sign In logic
             signInWithEmailAndPassword(auth, email, password)
             .then((userCredential) => {
                // Signed in 
              const user = userCredential.user;
              console.log(user); 
                // ...
            })
           .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode+"-"+errorMessage);
            });

        }
   };
   const toggleSignInForm=() => {
    setIsSignInForm(!isSignInForm);
};
    return (
        <div >
            <Header/>
            <div className="absolute ">
                <img src = {BG_URL}
                 alt="logo"
                />
            </div>
            <form onSubmit={(e) =>e.preventDefault()} className="bg-black/75 p-12 m-12 absolute w-3/12 my-24 mx-auto right-0 left-0 rounded-lg ">
                <h1 className="text-white text-2xl font-bold py-4">
                    {isSignInForm ? "Sign In ": "Sign Up" }
                </h1>
                {!isSignInForm &&(<input ref={name} type="text" placeholder="Full Name" className="p-2 my-2 w-full bg-gray-800 rounded-lg text-white" />)}
                <input ref={email} type="text" placeholder="Email Address" className="p-2 my-2 w-full bg-gray-800 rounded-lg text-white" />
                <input ref={password} type="password" placeholder="Password" className="p-2 my-2 w-full  bg-gray-800 rounded-lg text-white"/>
                <p className="text-red-600 py-2 font-bold">{errorMessage}</p>
                <button className="p-2 my-4 text-white bg-red-700 w-full rounded-lg" onClick={ handleButtonClick }>
                    {isSignInForm ? "Sign In" : "Sign Up"} 
                </button>
                <p className="py-6 text-white cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm ? "New to Netflix? Sign Up now." : "Already registered? Sign In now."}</p>
            </form>
        </div>
    )
};
export default Login;