import { useEffect,useState } from "react";
const useAppwrite=(fn)=>{
    const [data, setData] = useState([]);
    const [IsLoading, setIsLoading] = useState(true)
    

    useEffect(()=>{
        const fetchData=async()=>{
            setIsLoading(true);
            try {
                const response=await fn();
                setData(response);
                
            } catch (error) {
                Alert.alert('Error',error.message)
            }finally{
                setIsLoading(false);
            }
        }
        fetchData();
    },[]);

    const refetch=()=>fetchData();
    // console.log(data);
    return{data,IsLoading,refetch}
}
export default useAppwrite