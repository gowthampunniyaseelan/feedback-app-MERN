import React, { useEffect, useRef, useState } from "react";
import Home from "./Home";
import "./Sms.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import datas from "./common.json";
import template from "./sms_template.json";
function Sms() {
  let inputRef = useRef(null);
  let variableOneRef = useRef(null);
  let variableTwoRef = useRef(null);
  let templateConatiner = useRef(null);
  let variableContainer = useRef(null);
  let templateCheckBox = useRef(null);
  let previousEvent;
  let interval = null;
  const [radioValue, setRadioValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState({});
  const [templateValue, setTemplateValue] = useState("");
  const [smsCount, setSmsCount] = useState(0);
  const [senderId,setSenderId] = useState("");
  const [messageId,setMessageId] = useState("");
  const [variableTwo,setVariableTwo] = useState("");
  const [indexOfTemplate,setIndexOfTemplate] = useState(0);
  const [templateSelected,setTemplateSelected] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [variableCount,setVariableCount] = useState(0);
  const [indexOfVar,setIndexOfVar] = useState([]);
  const [tempTemplate,setTempTemplate] = useState("")

  useEffect(()=>{
      let arr = tempTemplate.split(" ");
      let count = 0
      for(let i = 0; i<arr.length; i++){
        if(arr[i].includes("{#var#}")){
          count+=1
          arr[i] = arr[i].replace("{#var#}",username[count])
          setTemplateValue(arr.join(" "));
          if(count === indexOfTemplate){
          break;
          }
      }
    }
  },[username, indexOfTemplate, tempTemplate])
  const handlePhoneChange = (event) => {
    const inputPhoneNumber = event.target.value;
    if (!/[a-zA-Z]/.test(inputPhoneNumber)) {
      setPhoneNumber(inputPhoneNumber);
    }
  };
 function countVariable(value){
  setVariableCount(0);
  let arr = value.split(" ")
  for(let i = 0; i < arr.length; i++){
    if(arr[i].includes("{#var#}")){
      setVariableCount(prev=>prev+1);
    }
  }
 }
  const handleCheckboxChange = (e, dataSender, dataMessage) => {
    var textarea1 = document.querySelector("#" + e.target.value);
    const newValue = textarea1.value;
    countVariable(newValue)
    setTemplateValue(newValue);
    setTempTemplate(newValue)
    setSenderId(dataSender);
    setMessageId(dataMessage);
    setTemplateSelected(false);
};


  
  function radioButtonChange(e) {
    setRadioValue(e.target.value);
  }

  function handleUserChange(e) {
    if(!templateSelected){
      var uniqueValue = Number(e.target.getAttribute('datatype'));
      setIndexOfTemplate(uniqueValue);
      const newValue = e.target.value.trimEnd();
        setUsername((prev)=>({...prev,[uniqueValue]:newValue}));
    }
  }

  function handleVariableChange(e){
    if(!templateSelected){
      const newValue = e.target.value.trimEnd();
      setVariableTwo(newValue);
      let arr = templateValue.split(" ");
      arr[indexOfTemplate] = newValue;
      setTemplateValue(arr.join(" "));
    }
  }
  
  function sendSms() {
    if ((radioValue === "individual") & (phoneNumber !== "") & (username !== "")) {
      axios
        .post(process.env.REACT_APP_SERVER_URL + "/sms", {
          phoneNumber: phoneNumber,
          username: username,
          senderId:senderId,
          messageId:messageId,
        })
        .then((res) => {
          toast.success("The message was sent successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setRadioValue("");
          setPhoneNumber("");
          setUsername("");
          setTemplateValue("");
          setSmsCount(0);
          window.location.reload();
        })
        .catch((e) => {
        });
    } else {
      axios
        .post(process.env.REACT_APP_SERVER_URL + "/bulksms", {
          senderId:senderId,
          messageId:messageId,
          username:username
        })
        .then((res) => {
          toast.success("The message was sent successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setRadioValue("");
          setPhoneNumber("");
          setUsername("");
          setTemplateValue("");
          setSmsCount(0);
          window.location.reload();
        })
        .catch((e) => {
        });
    }
  }

  useEffect(() => {
    if (radioValue === "bulk") {
      inputRef.current.hidden = true;
      variableOneRef.current.hidden = true;
      templateConatiner.current.style.marginTop = "150px"
      axios
        .get(process.env.REACT_APP_SERVER_URL + "/count")
        .then((res) => {
          setSmsCount(res.data.length);
          document.querySelector("#bulkSmsCount").style.display = "block";
        })
        .catch((e) => {
        });
    }

    if (radioValue === "individual") {
      inputRef.current.hidden = false;
      variableOneRef.current.hidden = false;
      templateConatiner.current.style.marginTop = "150px"
      document.querySelector("#bulkSmsCount").style.display = "none";
    }
  }, [radioValue]);

  useEffect(()=>{
    variableOneRef.current.hidden = true;
    inputRef.current.hidden = true;
    templateConatiner.current.style.marginTop = "50px"
    setTemplateSelected(true);
  },[])

  return (
    <div>
      <Home />
      <div className="sms_template">
        <div className="sms_title">
          <h5>{datas.sms}</h5>
        </div>
        <div className="user_sms">
          <input
            type="radio"
            name="sms"
            value="individual"
            onChange={radioButtonChange}
          />
          <div className="individual_sms">
            <p>{datas.individual_sms}</p>
            <input
            type="text"
            placeholder="Enter Username"
            value={username[1]}
            ref={variableOneRef}
            onChange={(e)=>handleUserChange(e)}
            datatype="1"
            className="form-control sms_input2"
          />
            <input
              type="tel"
              placeholder="Enter Mobile number"
              value={phoneNumber}
              onChange={handlePhoneChange}
              maxLength={10}
              className="form-control sms_input1"
              ref={inputRef}
            />
          </div>
          <div className="bulk_sms">
            <input
              type="radio"
              name="sms"
              value="bulk"
              onChange={radioButtonChange}
            />
            <p>{datas.bulk_sms}</p>
          </div>
        </div>
        <div className="sms_count">
          <p
            style={{
              display: "none",
            }}
            id="bulkSmsCount"
          >
            {"SMS will be sent to " + smsCount + " users"}
          </p>
        </div>
        <div className="template_container" ref={templateConatiner}>
          {template.map((item, idx) => (
            <div className="template">
              <div>
                <input
                  type="radio"
                  className="checkbox"
                  name="temp"
                  ref={templateCheckBox}
                  value={"text" + (idx + 1) + "Value"}
                  onChange={(e) => handleCheckboxChange(e,item.sender_id,item.message)}
                />
                <label htmlFor="">
                  {datas.approved_template} {idx + 1}
                </label>
              </div>
              <div className="template_one_container">
                <textarea
                  className="form-control"
                  id={item.id}
                  value={item.value}
                  dataSenderId={item.sender_id}
                  dataMessageId={item.message}
                ></textarea>
              </div>
            </div>
          ))}
        </div>
        <>
        {radioValue === "bulk" ? 
          Array.from({ length: variableCount - 1 }).map((_, i) => {
    i = i + 1;
    return (
        <div className="variable_container" ref={variableContainer} key={i}>
            <input
                type="text"
                placeholder={`Enter Variable ${i+1}`}
                value={username[i+1]}
                ref={variableTwoRef}
                datatype={i+1}
                onChange={(e)=>handleUserChange(e)}
                className="form-control sms_input2"
            />
        </div>
    );
})
 : 
          Array.from({ length: variableCount }).map((_, i) => (
            <div className="variable_container" ref={variableContainer} key={i}>
              <input
                type="text"
                placeholder={`Enter Variable ${i+1}`}
                value={username[i+1]}
                ref={variableTwoRef}
                datatype={i+1}
                onChange={(e)=>handleUserChange(e)}
                className="form-control sms_input2"
              />
            </div>
          ))
        }
        </>
        <div className="sms_container">
          <textarea
            className="form-control"
            name=""
            id=""
            cols="50"
            rows="5"
            value={templateValue}
          ></textarea>
        </div>
        <div className="send_btn_container">
          <button className="send_btn" onClick={sendSms}>
            {datas.send}
          </button>
        </div>

        <div className="progress_container"></div>

        <div className="sms_footer">
          <p>{datas.footer}</p>
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
    </div>
  );
}

export default Sms;
