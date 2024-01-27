import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import myImage from "../slice5.png";
import RestoreIcon from "@mui/icons-material/Restore";
import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import datas from "./common.json"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple, faComment,faPaperPlane, faUsers } from '@fortawesome/free-solid-svg-icons'

function Home() {
  const [walletBalance, setWalletBalance] = useState(0);
  function logout() {
    window.localStorage.removeItem("authTokenHashind")
    window.localStorage.removeItem("username")
    window.location.href="/"
  }
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/refresh-sms-balance")
      .then((res) => {
        setWalletBalance(res.data);
        // toast.info("Wallet amount updated", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
      });
      
  }, [walletBalance]);
  function refreshBalance() {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/refresh-sms-balance")
      .then((res) => {
        setWalletBalance(res.data);
        toast.info("Wallet amount updated", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }
  return (
    <div>
      <div className="navbar_container">
        <div className="logo">
          <div className="home_header_logo_container">
            <img src={myImage} alt="logo" className="home_header_logo" />
          </div>
        </div>
        <div className="wallet_balance">
          <p>{datas.wallet_balance}{walletBalance}</p>
        </div>
        <div className="refresh_balance" onClick={refreshBalance}>
          <RestoreIcon />
        </div>

        <div className="logout_admin_container">
          <div class="dropdown mt-3">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {window.localStorage.getItem("username")}
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" onClick={logout}>
                  {datas.logout}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="side_nav">
        <div className="side_nav_content">
          <NavLink to="/customer"><FontAwesomeIcon icon={faUsers}/> {datas.customer}</NavLink>
          <NavLink to="/feedback"><FontAwesomeIcon icon={faComment}/> {datas.feedback}</NavLink>
          <NavLink to="/dashboard"><FontAwesomeIcon icon={faChartSimple}/> {datas.dashboard}</NavLink>
          <NavLink to="/sms"><FontAwesomeIcon icon={faPaperPlane}/> {datas.send_sms}</NavLink>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Home;
