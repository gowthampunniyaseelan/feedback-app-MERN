import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import datas from "../config.json";
import "./Feedback.css";
import Home from "./Home";
import Footer from "./Footer";
import common from "./common.json";
import { ToastContainer, toast } from "react-toastify";
import templates from "./sms_template.json";
import "react-toastify/dist/ReactToastify.css";
function Feedback() {
  const [rating, setRating] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [date, setDate] = useState(new Date());
  const [visitingtime, setVisitingTime] = useState("");
  const [comments, setComments] = useState("");
  const [name, setName] = useState("");
  const [Bd, setBd] = useState("");
  const [wishes, setWishes] = useState("");
  const [mobile, setMobile] = useState("");
  const [wedding, setWedding] = useState("");
  const [index, setIdx] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedBdDate, setSelectedBdDate] = useState("");
  const [selectedWdDate, setSelectedWdDate] = useState("");
  const [overAllRating, setOverAllRating] = useState("");
  const [qualityOfService, setQualityOfService] = useState("");
  const [cleanliness, setCleanliness] = useState("");
  const [theQualityOfTheFood, setTheQualityOfTheFood] = useState("");
  const [employeeBehaviour, setEmployeeBehaviour] = useState("");
  const [speedOfService, setSpeedOfService] = useState("");
  const [appearanceOfEmployee, setAppearanceOfEmployee] = useState("");
  const [valueForCash, setValueForCash] = useState("");
  const [message,setMessage] = useState("");
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setDate(event.target.value);
  };

  const today = new Date();
  const formattedDate = today.toISOString().substr(0, 10);

  const handleBdDateChange = (event) => {
    setSelectedBdDate(event.target.value);
    setBd(event.target.value);
  };
  const handleWdDateChange = (event) => {
    setSelectedWdDate(event.target.value);
    setWedding(event.target.value);
  };

  function onOptionChange(e, idx) {
    setIdx(index + idx);
    if (e.target.value === "4") {
      setRating(rating + 4);
    }
    if (e.target.value === "3") {
      setRating(rating + 3);
    }
    if (e.target.value === "2") {
      setRating(rating + 2);
    }
    if (e.target.value === "1") {
      setRating(rating + 1);
    }
    if (idx === 2) {
      setQualityOfService(
        document.querySelectorAll("#feedbackUserRating")[idx].value === "4"
          ? "Very good"
          : document.querySelectorAll("#feedbackUserRating")[idx].value === "3"
          ? "Good"
          : document.querySelectorAll("#feedbackUserRating")[idx].value === "2"
          ? "Average"
          : "Not average"
      );
    }
    if (idx === 1) {
      setCleanliness(
        document.querySelectorAll("#feedbackUserRating")[idx].value === "4"
          ? "Very good"
          : document.querySelectorAll("#feedbackUserRating")[idx].value === "3"
          ? "Good"
          : document.querySelectorAll("#feedbackUserRating")[idx].value === "2"
          ? "Average"
          : "Not average"
      );
    }
    if (idx === 0) {
      setTheQualityOfTheFood(
        document.querySelectorAll("#feedbackUserRating")[idx].value === "4"
          ? "Very good"
          : document.querySelectorAll("#feedbackUserRating")[idx].value === "3"
          ? "Good"
          : document.querySelectorAll("#feedbackUserRating")[idx].value === "2"
          ? "Average"
          : "Not average"
      );
    }
    if (idx === 3) {
      setEmployeeBehaviour(
        document.querySelectorAll("#feedbackUserRating")[idx].value === "4"
          ? "Very good"
          : document.querySelectorAll("#feedbackUserRating")[idx].value === "3"
          ? "Good"
          : document.querySelectorAll("#feedbackUserRating")[idx].value === "2"
          ? "Average"
          : "Not average"
      );
    }
    if (idx === 4) {
      setSpeedOfService(
        document.querySelectorAll("#feedbackUserRating")[idx].value === "4"
          ? "Very good"
          : document.querySelectorAll("#feedbackUserRating")[idx].value === "3"
          ? "Good"
          : document.querySelectorAll("#feedbackUserRating")[idx].value === "2"
          ? "Average"
          : "Not average"
      );
    }
    if (idx === 5) {
      setAppearanceOfEmployee(
        document.querySelectorAll("#feedbackUserRating")[idx].value === "4"
          ? "Very good"
          : document.querySelectorAll("#feedbackUserRating")[idx].value === "3"
          ? "Good"
          : document.querySelectorAll("#feedbackUserRating")[idx].value === "2"
          ? "Average"
          : "Not average"
      );
    }
    if (idx === 6) {
      setValueForCash(
        document.querySelectorAll("#feedbackUserRating")[idx].value === "4"
          ? "Very good"
          : document.querySelectorAll("#feedbackUserRating")[idx].value === "3"
          ? "Good"
          : document.querySelectorAll("#feedbackUserRating")[idx].value === "2"
          ? "Average"
          : "Not average"
      );
    }
  }
  function submit(e) {
    e.preventDefault();
    if (
      (rating >= 8) &
      (name !== "") &
      (mobile !== "") &
      (visitingtime !== "")
    ) {
      if ((rating > 24) & (rating <= 32)) {
        setOverAllRating("Good");
      } else if ((rating > 16) & (rating <= 24)) {
        setOverAllRating("Average");
      } else {
        setOverAllRating("Negative");
      }
    }
  }
  useEffect(() => {
    if (overAllRating !== "") {
      axios
        .post(process.env.REACT_APP_SERVER_URL + "/feedback", {
          date: date,
          customer_phone_number: mobile,
          customer_birthday_date: Bd,
          customer_wedding_date: wedding,
          visiting_time: visitingtime,
          customer_name: name,
          the_quality_of_the_food: theQualityOfTheFood,
          cleanliness: cleanliness,
          quality_of_service: qualityOfService,
          employee_behaviour: employeeBehaviour,
          speed_of_service: speedOfService,
          appearance_of_employee: appearanceOfEmployee,
          value_for_cash: valueForCash,
          comments: comments,
          wishes: wishes,
          overall_rating: overAllRating,
          isActive:true
        })
        .then((result) => {
          toast.success("Feedback submitted successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          if(overAllRating === "Good" || overAllRating === "Average"){
            let rating = templates.find(item => item.rating === "G");
            axios
            .post(process.env.REACT_APP_SERVER_URL + "/feedback-sms", {
              customer_phone_number: mobile,
              customer_name: name,
              senderId:rating.sender_id,
              messageId:rating.message
            })
            .then(() => {
              window.location.reload();
            })
            .catch((e) => {});
          }
          if(overAllRating === "Negative"){
            let rating = templates.find(item => item.rating === "N");
            axios
            .post(process.env.REACT_APP_SERVER_URL + "/feedback-sms", {
              customer_phone_number: mobile,
              customer_name: name,
              senderId:rating.sender_id,
              messageId:rating.message
            })
            .then(() => {
              window.location.reload();
            })
            .catch((e) => {});
          }
        })
        .catch((e) => {
        });
    }
  }, [
    Bd,
    appearanceOfEmployee,
    cleanliness,
    comments,
    date,
    employeeBehaviour,
    mobile,
    name,
    overAllRating,
    qualityOfService,
    speedOfService,
    theQualityOfTheFood,
    valueForCash,
    visitingtime,
    wedding,
    wishes,
  ]);

  useEffect(() => {
    if (
      (index === 21) &
      (name !== "") &
      (mobile !== "") &
      (visitingtime !== "")
    ) {
      setIsDisabled(false);
    }
  },[index,name,mobile,visitingtime]);

  function findUser(e) {
    e.preventDefault();
    axios
      .get(process.env.REACT_APP_SERVER_URL + `/feedback/${mobile}`)
      .then((result) => {
        const toast = document.querySelector(".feedback_toast");
        if (result.data === "") {
          toast.style.display = "inline";
          setName("");
          setBd(formattedDate);
          setWedding(formattedDate);
        } else {
          toast.style.display = "none";
          setName(result.data.customer_name);
          setBd(result.data.customer_birthday_date);
          setWedding(result.data.customer_wedding_date);
        }
      })
      .catch((e) => {
      });
  }

  const handlePhoneChange = (event) => {
    const inputPhoneNumber = event.target.value;

    if (!/[a-zA-Z]/.test(inputPhoneNumber)) {
      setMobile(inputPhoneNumber);
    }
  };

  document.addEventListener("keydown", (event) => {
    if (event.keyCode === 13 || event.key === "Enter") {
      findUser();
    }
  });
  return (
    <div className="App">
      <Home />
      <div className="header__container">
        <div className="header">
          <div className="title">
            <h3>{common.customer_opinion}</h3>
          </div>
        </div>
      </div>
      <span className="feedback_date">
        {common.date}:{" "}
        <input
          type="date"
          className="date_input"
          id="date-input"
          value={selectedDate || formattedDate}
          onChange={handleDateChange}
          required
        />
      </span>
      <div className="input_box_container">
        <div>
          <div className="mobile_number_container">
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={mobile}
              onChange={handlePhoneChange}
              maxLength={10}
              className="form-control text_input"
              required
            />
            <button
              class="btn btn-outline-secondary search_button"
              type="button"
              onClick={findUser}
            >
              {common.search}
            </button>
          </div>
          <span className="feedback_toast">{common.no_user}</span>
        </div>

        <div>
          <input
            type="text"
            className="form-control text_input"
            placeholder="Enter your name"
            name=""
            id=""
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="">{common.birthday}</label>
          <input
            type="date"
            className="date_input"
            name=""
            id=""
            value={Bd ? Bd : selectedBdDate || formattedDate}
            onChange={handleBdDateChange}
            style={{
              marginLeft: 224,
            }}
          />
        </div>
        <div>
          <label htmlFor="">{common.wedding_date}</label>
          <input
            type="date"
            className="date_input"
            name=""
            id=""
            value={wedding ? wedding : selectedWdDate || formattedDate}
            onChange={handleWdDateChange}
            style={{
              marginLeft: 180,
            }}
          />
        </div>
      </div>

      <div className="food_container">
        <span>
          <label htmlFor="visitingTime">{common.visiting_time}</label>
        </span>
        <span>
          <input
            type="radio"
            className="radio"
            value="breakfast"
            name="visit"
            onChange={(e) => setVisitingTime(e.target.value)}
            required
          />
          <label htmlFor="breakfast">{common.breakfast}</label>
        </span>
        <span>
          <input
            type="radio"
            className="radio"
            value="lunch"
            name="visit"
            onChange={(e) => setVisitingTime(e.target.value)}
            required
          />
          <label htmlFor="lunch">{common.lunch}</label>
        </span>
        <span>
          <input
            type="radio"
            className="radio"
            value="evening"
            name="visit"
            onChange={(e) => setVisitingTime(e.target.value)}
            required
          />
          <label htmlFor="evening">{common.evening}</label>
        </span>
        <span>
          <input
            type="radio"
            className="radio"
            value="dinner"
            name="visit"
            onChange={(e) => setVisitingTime(e.target.value)}
            required
          />
          <label htmlFor="dinner">{common.dinner}</label>
        </span>
      </div>
      <br />
      <table className="feedback_table">
        <thead>
          <tr>
            <th className="table_head"></th>
            <th className="table_head">{common.very_good}</th>
            <th className="table_head">{common.good}</th>
            <th className="table_head">{common.average}</th>
            <th className="table_head">{common.not_average}</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((val, idx) => (
            <tr key={idx}>
              <td className="table_data">{val.value}</td>
              <td className="table_data">
                <input
                  id="feedbackUserRating"
                  type="radio"
                  className="radio"
                  name={`myGroupName` + idx}
                  onChange={(e) => onOptionChange(e, idx)}
                  value="4"
                  required
                />
              </td>

              <td className="table_data">
                <input
                  id="feedbackUserRating"
                  type="radio"
                  className="radio"
                  name={`myGroupName` + idx}
                  onChange={(e) => onOptionChange(e, idx)}
                  value="3"
                  required
                />
              </td>
              <td className="table_data">
                <input
                  id="feedbackUserRating"
                  type="radio"
                  className="radio"
                  name={`myGroupName` + idx}
                  onChange={(e) => onOptionChange(e, idx)}
                  value="2"
                  required
                />
              </td>
              <td className="table_data">
                <input
                  id="feedbackUserRating"
                  type="radio"
                  className="radio"
                  name={`myGroupName` + idx}
                  onChange={(e) => onOptionChange(e, idx)}
                  value="1"
                  required
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="input_box_container">
        <div>
          <form className="form">
            <label>{common.any_other_comments}</label>
            <div>
              <textarea
                className="textarea form-control"
                onChange={(e) => setComments(e.target.value)}
                style={{
                  marginLeft: 4,
                }}
              ></textarea>
            </div>
          </form>
        </div>
        <div>
          <form className="form">
            <label>Wishes: </label>
            <div className="wish_textarea_container">
              <textarea
                className="textarea form-control"
                onChange={(e) => setWishes(e.target.value)}
                style={{
                  marginLeft: 215,
                }}
              ></textarea>
            </div>
          </form>
        </div>
      </div>
      <div className="heading_subtitle">
        <p>{common.thank_you_for_choosing_us}</p>
        <p>{common.help_us_to_serve_better}</p>
      </div>
      <div className="feedback_btn_container">
        <button
          onClick={submit}
          disabled={isDisabled}
          className={isDisabled ? "blur" : "button"}
        >
          {common.submit}
        </button>
      </div>
<div className="feedback_footer">
  <p className="feedback_footer_name">{common.footer}</p>
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

export default Feedback;
