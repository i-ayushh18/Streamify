import {createContext,useContext,useState,useEffect} from 'react';
import {getCurrentUser} from '../lib/appwrite'

const GlobalContext=createContext();
export const useGlobalContext=()=>useContext(GlobalContext);
const GlobalProvider=({children})=>{
   const [isloggedIn, setIsloggedIn] = useState(false)
   const [user, setUser] = useState(null)
   const [isLoading, setisLoading] = useState(true);
   useEffect(() => {
    getCurrentUser()
    .then((res)=>{
        if(res){
        setIsloggedIn(true)
        setUser(res)
        
    }else{
        setIsloggedIn(false)
        setUser(null)

    }
    
   })
   .catch((error)=>{
     console.log(error);
   })
   .finally(()=>{
    setisLoading(false)
   })
    
   },[]);
   


    return(
        <GlobalContext.Provider
        value={{
            isloggedIn,
            setIsloggedIn,
            user,
            setUser,
            isLoading

        }}
        >
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalProvider;