
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser,removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { useDispatch } from "react-redux";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
const Header = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user= useSelector((store)=> store.user);
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
    const handleSignOut =()=> {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/")
          }).catch((error) => {
            // An error happened.
            navigate("/error");
          });
    };
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const {uid, email, displayName, photoURL} = user;
            dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}));
           
            // ...
          
          } else {
              dispatch(removeUser());
              navigate("/");
            // User is signed out
            // ...
          }
        });
        //unsubscribe when component unmounts
        return () => unsubscribe();  
  },[dispatch]);
    
      const handleGptSearchClick = () => {
        // Toggle GPT Search
        dispatch(toggleGptSearchView());
      };

      const handleLanguageChange = (e) => {
        console.log(e.target.value);
        dispatch(changeLanguage(e.target.value));
      };
      
    return (
        
            <div className="absolute w-screen bg-gradient-to-b from-black z-10 flex justify-between">
                <img src ={ LOGO }
                 alt="logo" className="w-40 h-35  m-3 p-3"
                />
               {user && 
               <div className="flex p-2">
                {showGptSearch && (
                <select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
                 {SUPPORTED_LANGUAGES.map((lang)=>(
                  <option key={lang.identifier} value={lang.identifier} >
                    {lang.name}
                  </option>
                 ))};
                  
                </select>
                )}
                    {/* <img className="w-12 h-12"
                    alt="usericon" src="https://occ-0-6246-2186.1.nflxso.net/dnm/api/v6/vN…vOWyS6Xl3wkKoIHBIknKKSY7YjP3lhLbaaMR3u8.png?r=72f"/>
                     */}
                    <button className="py-2 px-4 mx-3 my-2 text-white bg-slate-600"
                    onClick = { handleGptSearchClick } >
                    {showGptSearch ? "HomePage" : "GPT Search"}
                    </button>
                    <img className="w-12 h-12" alt="usericon" src={user?.photoURL} />
                    <button onClick={handleSignOut} className="font-bold text-white">Sign Out</button>
                </div>
               }
            </div>
        
    )
};
export default Header;