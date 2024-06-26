import Header from "./Home/Header";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMe } from "./api/user";
import AppStateContext from "../utils/appState";
export default function Layout({ children }) {
  const [amount, setAmount] = useState(0);
  const [payment_type, setPaymentType] = useState("one_time");

  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();



  async function fetchProfile(){
    const data = await getMe()
    if (data) {
      setUser(data?.user);
    }
  }
  useEffect( ()=> {
    fetchProfile();

  }, [])

  useEffect( ()=>{
    if(user && location.pathname === '/login'){
      navigate('/');
    }
  }, [user,location, navigate])


  const value = {
    amount,
    setAmount,
    payment_type,
    setPaymentType,
    user,
    setUser,
  };

  return (
    <div className=" max-w-[1536px] flex justify-center flex-col mx-auto">
      <AppStateContext.Provider value={value}>
        <Header />
        <div>{children}</div>
      </AppStateContext.Provider>
    </div>
  );
}
