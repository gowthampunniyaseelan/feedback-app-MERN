import React, { useEffect, useRef, useState } from "react";
import "./Dashboard.css";
import Footer from "./Footer";
import Home from "./Home";
import Chart from "react-apexcharts";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import datas from "./common.json";
function Dashboard() {
  const myImage = require('../nodatadog.png');
  const selectRef = useRef();
  const [goods, setGood] = useState(0);
  const [averages, setAverage] = useState(0);
  const [negatives, setNegative] = useState(0);

  const [currentMonthGoods, setCurrentMonthGood] = useState(0);
  const [currentMonthAverages, setCurrentMonthAverage] = useState(0);
  const [currentMonthNegatives, setCurrentMonthNegative] = useState(0);

  const [lastSixMonthGoods, setLastSixMonthGood] = useState(0);
  const [lastSixMonthAverages, setLastSixMonthAverage] = useState(0);
  const [lastSixMonthNegatives, setLastSixMonthNegative] = useState(0);

  const [visitingTime, setVisitingTime] = useState("");

  const [overallVisitingTimeGoods, setOverallVisitingTimeGood] = useState(0);
  const [overallVisitingTimeAverages, setOverallVisitingTimeAverage] =
    useState(0);
  const [overallVisitingTimeNegatives, setOverallVisitingTimeNegative] =
    useState(0);

  const [
    overallVisitingTimeLastSixMonthGoods,
    setOverallVisitingTimeLastSixMonthGood,
  ] = useState(0);
  const [
    overallVisitingTimeLastSixMonthAverages,
    setOverallVisitingTimeLastSixMonthAverage,
  ] = useState(0);
  const [
    overallVisitingTimeLastSixMonthNegatives,
    setOverallVisitingTimeLastSixMonthNegative,
  ] = useState(0);

  const [
    overallVisitingTimeCurrentMonthGoods,
    setOverallVisitingTimeCurrentMonthGood,
  ] = useState(0);
  const [
    overallVisitingTimeCurrentMonthAverages,
    setOverallVisitingTimeCurrentMonthAverage,
  ] = useState(0);
  const [
    overallVisitingTimeCurrentMonthNegatives,
    setOverallVisitingTimeCurrentMonthNegative,
  ] = useState(0);

  const [checking, setChecking] = useState(false);

  const[dog,setDog]=useState(false);
  const[overAllDog,setOverAllDog]= useState(false)
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/overall-rating")
      .then((res) => {
        setOverAllDog(false)
        res.data.map((item) => {
          let { overall_rating } = item;
          let { today_date } = item;
          if (overall_rating === "Good") {
            setGood((prev) => prev + 1);
          } else if (overall_rating === "Average") {
            setAverage((prev) => prev + 1);
          } else {
            setNegative((prev) => prev + 1);
          }
        });
      })
      .catch((e) => {
        setOverAllDog(true)
      });
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/current-month-rating")
      .then((res) => {
        // if(res.data.length){
          res.data.map((item) => {
            let { overall_rating } = item;
            let { today_date } = item;
            if (overall_rating === "Good") {
              setCurrentMonthGood((prev) => prev + 1);
            } else if (overall_rating === "Average") {
              setCurrentMonthAverage((prev) => prev + 1);
            } else {
              setCurrentMonthNegative((prev) => prev + 1);
            }
          });
        // }    
      })
      .catch((e) => {
      });
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/last-six-month-rating")
      .then((res) => {
        res.data.map((item) => {
          let { overall_rating } = item;
          let { today_date } = item;
          if (overall_rating === "Good") {
            setLastSixMonthGood((prev) => prev + 1);
          } else if (overall_rating === "Average") {
            setLastSixMonthAverage((prev) => prev + 1);
          } else {
            setLastSixMonthNegative((prev) => prev + 1);
          }
        });
      })
      .catch((e) => {
      });
  }, []);
  useEffect(()=>{
    const event = new Event('change', { bubbles: true });
    selectRef.current.dispatchEvent(event);
  },[])
function handleVisitingTimeChange(e){
setVisitingTime(e.target.value);
}

useEffect(() => {
  if (visitingTime) {
    axios.get(
      process.env.REACT_APP_SERVER_URL +
        `/overall-data/${visitingTime}`
    )
    .then((res) => {
      let { data } = res;
      let currentMonth = data.currentMonthArr[0];
      let lastSixMonth = data.lastSixMonth[0];
      let overall = data.overall[0];
      if (
        currentMonth.length === 0 &&
        lastSixMonth.length === 0 &&
        overall.length === 0
      ) {
        setChecking(false);
        setDog(true);
        toast.error("There is no data the visiting time you selected", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setChecking(true);
        setDog(false);
        toast.success("Success", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        overall.map((item) => {
          let { overall_rating } = item;
          if (overall_rating === "Good") {
            setOverallVisitingTimeGood((prev) => prev + 1);
          } else if (overall_rating === "Average") {
            setOverallVisitingTimeAverage((prev) => prev + 1);
          } else {
            setOverallVisitingTimeNegative((prev) => prev + 1);
          }
        });

        lastSixMonth.map((item) => {
          let { overall_rating } = item;
          if (overall_rating === "Good") {
            setOverallVisitingTimeLastSixMonthGood((prev) => prev + 1);
          } else if (overall_rating === "Average") {
            setOverallVisitingTimeLastSixMonthAverage((prev) => prev + 1);
          } else {
            setOverallVisitingTimeLastSixMonthNegative((prev) => prev + 1);
          }
        });

        currentMonth.map((item) => {
          let { overall_rating } = item;
          if (overall_rating === "Good") {
            setOverallVisitingTimeCurrentMonthGood((prev) => prev + 1);
          } else if (overall_rating === "Average") {
            setOverallVisitingTimeCurrentMonthAverage((prev) => prev + 1);
          } else {
            setOverallVisitingTimeCurrentMonthNegative((prev) => prev + 1);
          }
        });
      }
    })
    .catch((e) => {
    });
  }
}, [visitingTime]);
  let good = "Good = " +  Math.floor(goods / 2);
  let average = "Average = " +  Math.floor(averages / 2);
  let negative = "Negative = " +  Math.floor(negatives / 2);

  let currentMonthGood = "Good = " +  Math.floor(currentMonthGoods / 2);
  let currentMonthAverage = "Average = " +  Math.floor(currentMonthAverages / 2);
  let currentMonthNegative = "Negative = " +  Math.floor(currentMonthNegatives / 2);

  let lastSixMonthGood = "Good = " +  Math.floor(lastSixMonthGoods / 2);
  let lastSixMonthAverage = "Average = " +  Math.floor(lastSixMonthAverages / 2);
  let lastSixMonthNegative = "Negative = " +  Math.floor(lastSixMonthNegatives / 2);

  let overallVisitingTimeGood = "Good = " +  Math.floor(overallVisitingTimeGoods);
  let overallVisitingTimeAverage = "Average = " +  Math.floor(overallVisitingTimeAverages);
  let overallVisitingTimeNegative =
    "Negative = " +  Math.floor(overallVisitingTimeNegatives);

  let overallVisitingTimeLastSixMonthGood =
    "Good = " +  Math.floor(overallVisitingTimeLastSixMonthGoods);
  let overallVisitingTimeLastSixMonthAverage =
    "Average = " +  Math.floor(overallVisitingTimeLastSixMonthAverages);
  let overallVisitingTimeLastSixMonthNegative =
    "Negative = " +  Math.floor(overallVisitingTimeLastSixMonthNegatives);

  let overallVisitingTimeCurrentMonthGood =
    "Good = " +  Math.floor(overallVisitingTimeCurrentMonthGoods);
  let overallVisitingTimeCurrentMonthAverage =
    "Average = " +  Math.floor(overallVisitingTimeCurrentMonthAverages);
  let overallVisitingTimeCurrentMonthNegative =
    "Negative = " +  Math.floor(overallVisitingTimeCurrentMonthNegatives);

  const state = {
    options: { labels: [good, average, negative] },
    series: [
      Math.floor((goods / 100) * 100),
      Math.floor((averages / 100) * 100),
      Math.floor((negatives / 100) * 100),
    ],
  };

  const currentMonthState = {
    options: {
      labels: [currentMonthGood, currentMonthAverage, currentMonthNegative],
    },
    series: [
     Math.floor((currentMonthGoods / 100) * 100),
     Math.floor((currentMonthAverages / 100) * 100),
     Math.floor((currentMonthNegatives / 100) * 100),
    ],
  };

  const lastSixMonthState = {
    options: {
      labels: [lastSixMonthGood, lastSixMonthAverage, lastSixMonthNegative],
    },
    series: [
      Math.floor((lastSixMonthGoods / 100) * 100),
      Math.floor((lastSixMonthAverages / 100) * 100),
      Math.floor((lastSixMonthNegatives / 100) * 100),
    ],
  };

  const overallVisitingTimeState = {
    options: {
      labels: [
        overallVisitingTimeGood,
        overallVisitingTimeAverage,
        overallVisitingTimeNegative,
      ],
    },
    series: [
      Math.floor((overallVisitingTimeGoods / 100) * 100),
      Math.floor((overallVisitingTimeAverages / 100) * 100),
      Math.floor((overallVisitingTimeNegatives / 100) * 100),
    ],
  };

  const overallVisitingTimeLastSixMonthState = {
    options: {
      labels: [
        overallVisitingTimeLastSixMonthGood,
        overallVisitingTimeLastSixMonthAverage,
        overallVisitingTimeLastSixMonthNegative,
      ],
    },
    series: [
      Math.floor((overallVisitingTimeLastSixMonthGoods / 100) * 100),
      Math.floor((overallVisitingTimeLastSixMonthAverages / 100) * 100),
      Math.floor((overallVisitingTimeLastSixMonthNegatives / 100) * 100),
    ],
  };

  const overallVisitingTimeCurrentMonthState = {
    options: {
      labels: [
        overallVisitingTimeCurrentMonthGood,
        overallVisitingTimeCurrentMonthAverage,
        overallVisitingTimeCurrentMonthNegative,
      ],
    },
    series: [
      Math.floor((overallVisitingTimeCurrentMonthGoods / 100) * 100),
      Math.floor((overallVisitingTimeCurrentMonthAverages / 100) * 100),
      Math.floor((overallVisitingTimeCurrentMonthNegatives / 100) * 100),
    ],
  };

  return (
    <div>
      <Home />
      <div className="dashboard_container">
        <div className="dashboard_heading">
          <h3>{datas.dashboard}</h3>
        </div>
      { overAllDog ? 
      <>
      <div className="dog_saying_no_data_for_overall">
              <img src={myImage} alt="dog" style={{
                width:150,
                height:200
              }}/>
              <h2>No data available, Sorry you can't see chart</h2>
            </div> 
            <Footer/>
            </>
            : 
            <>
            <div className="review_container">
          <div className="overall_review">
            <div>
              <h5>{datas.overall_review}</h5>
              {state.series.filter(value=>value!==0).length !== 0 ? 
              <Chart
                options={state.options}
                series={state.series}
                type="donut"
                width="350"
              /> :  <div className="no_chart_container">
              <h5>
                No data
              </h5>
              </div>}
            </div>
            <div>
              <h5>{datas.current_month}</h5>
              {currentMonthState.series.filter(value=>value!==0).length !== 0 ? 
                <Chart
                options={currentMonthState.options}
                series={currentMonthState.series}
                type="donut"
                width="350"
              /> : <div className="no_chart_container">
              <h5>
                No data
              </h5>
              </div>
              }
             
            </div>
            <div>
              <h5>{datas.last_6_month}</h5>
              {lastSixMonthState.series.filter(value=>value!==0).length !== 0 ?
                <Chart
                options={lastSixMonthState.options}
                series={lastSixMonthState.series}
                type="donut"
                width="350"
              /> : <div className="no_chart_container">
              <h5>
                No data
              </h5>
              </div>
              }
            </div>
          </div>
        </div>
        <hr />
        <div className="visiting_container">
          <div className="visiting_select">
            <label htmlFor="">{datas.visiting_time}</label>
            <select
              name=""
              ref={selectRef}
              id="visitingSelectChange"
              onChange={handleVisitingTimeChange}
            >
              {/* <option value="">{datas.choose}</option> */}
              <option value="breakfast">{datas.morning}</option>
              <option value="lunch">{datas.afternoon}</option>
              <option value="evening">{datas.evening}</option>
              <option value="dinner">{datas.night}</option>
            </select>
          </div>
          </div>
          { dog ? <div className="dog_saying_no_data">
              <img src={myImage} alt="dog" style={{
                width:150,
                height:200
              }}/>
              <p>Sorry There is no data available the visiting time you selected</p>
            </div> : checking ? (
            <div className="review_container">
              <div className="overall_review">
                <div>
                  <h5>{datas.overall_review}</h5>
                  {overallVisitingTimeState.series.filter(value=>value!==0).length !== 0 ?
                  <Chart
                    options={overallVisitingTimeState.options}
                    series={overallVisitingTimeState.series}
                    type="donut"
                    width="350"
                  /> : <div className="no_chart_container">
              <h5>
                No data
              </h5>
              </div>}
                </div>
                <div>
                  <h5>{datas.current_month}</h5>
                  {overallVisitingTimeCurrentMonthState.series.filter(value=>value!==0).length !== 0 ?
                  <Chart
                    options={overallVisitingTimeCurrentMonthState.options}
                    series={overallVisitingTimeCurrentMonthState.series}
                    type="donut"
                    width="350"
                  /> : 
                  <div className="no_chart_container">
                  <h5>
                    No data
                  </h5>
                  </div>}
                </div>
                <div>
                  <h5>{datas.last_6_month}</h5>
                  {overallVisitingTimeLastSixMonthState.series.filter(value=>value!==0).length !== 0 ?
                  <Chart
                    options={overallVisitingTimeLastSixMonthState.options}
                    series={overallVisitingTimeLastSixMonthState.series}
                    type="donut"
                    width="350"
                  /> : 
                  <div className="no_chart_container">
                  <h5>
                    No data
                  </h5>
                  </div>
                  }
                </div>
              </div>
            </div>
          ) : (
            <div className="no_chart_available">
              <h5>{datas.choose_visiting_time_to_see_chart}</h5>
            </div>
          )}
        <div className="dashboard_footer">
          <p className="dashboard_footer_name">{datas.footer}</p>
        </div>
        </>
      }  

      </div>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
