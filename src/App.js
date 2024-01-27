import "./App.css";
import Feedback from "./components/Feedback";
import Customer from "./components/Customer";
import Dashboard from "./components/Dashboard";
import Sms from "./components/Sms";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import NotFoundPage from "./components/NotFoundPage";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {

  const [loader,setLoader]=useState(false);
  const token = window.localStorage.getItem("authTokenHashind");
  useEffect(()=>{
    setLoader(true)
    axios.get(process.env.REACT_APP_SERVER_URL+"/verify",{
      headers: {
        "x-auth-token": token
      }
    }).then((res)=>{
      setLoader(false)
    }).catch((e)=>{
      toast.error("Your credential was wrong, Try login again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoader(false)
    })
    },[token])

  return (
    <>
    {loader ? <Loader/> :  token ?
    <Router>
        <Routes>
        <Route exact path="/" element={<Login />} />
          <Route path="/customer" element={<Customer /> }/>
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sms" element={<Sms />} />
          <Route path="*" element={<NotFoundPage />} /> 
        </Routes>
      </Router>
       : <Login/>}
       <ToastContainer/>
       </>
  );
}

export default App;
