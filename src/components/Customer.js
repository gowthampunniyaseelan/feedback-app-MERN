import React, { useEffect, useRef,useState } from "react";
import "./Customer.css";
import Home from "./Home";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import axios from "axios";
import datas from "./common.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const myImage = require('../nodatadog.png');
function Customer() {
  const [currentPage, setCurrentPage] = useState(0);
  const [number, setNumber] = useState("");
  const [data, setData] = useState([]);
  const [mobile,setMobile]=useState("");
  const [id,setId]=useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [customerBirthdayDate, setCustomerBirthdayDate] = useState("");
  const [customerWeddingDate, setCustomerWeddingDate] = useState("");
  const buttonRef = useRef(null);
  const dataFetchedRef = useRef(false);
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    function searchCustomer(){
      if(!number){
        // alert("I am sync")
        axios.get(process.env.REACT_APP_SERVER_URL + "/sync").then((result) => {
          if(Object.keys(result.data).length){
              setData(result.data);
            if(document.querySelector(".table_container")){
              document.querySelector(".table_container").style.display="flex";
            }
            if(document.querySelector(".search_container")){
              document.querySelector(".search_container").style.display="flex";
            }
            if(document.querySelector(".loader_customer")){
              document.querySelector(".loader_customer").style.display="none";
            }
            if(document.querySelector(".total_customer")){
              document.querySelector(".total_customer").style.display="block"
            }
            if(document.querySelector(".pagination")){
              document.querySelector(".pagination").style.display="block";
            }
            if(document.querySelector(".dog_saying_no_data_to_customer")){
              document.querySelector(".dog_saying_no_data_to_customer").style.display="none";
            }
            
          }else{
            if(document.querySelector(".loader_customer")){
              document.querySelector(".loader_customer").style.display="none";
            }
            if(document.querySelector(".total_customer")){
              document.querySelector(".total_customer").style.display="none"
            }
            if(document.querySelector(".table_container")){
              document.querySelector(".table_container").style.display="none";
            }
            if(document.querySelector(".search_container")){
              document.querySelector(".search_container").style.display="none";
            }
          if(document.querySelector(".pagination")){
            document.querySelector(".pagination").style.display="none";
          }
          if(document.querySelector(".dog_saying_no_data_to_customer")){
            document.querySelector(".dog_saying_no_data_to_customer").style.display="inline-block";
          }
          }
        }).catch((e)=>{
        })
      }
    }
  searchCustomer(); 
  }, []);

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 || event.key === "Enter") {
      buttonRef.current.click();
    }
  };
  function resetUser(){
    window.location.reload();
  }
  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;
  const pageCount = data.length >= 1 ? 1 : Math.floor(data.length / PER_PAGE);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  function handleInputChange(e) {
    setNumber(e.target.value);
  }

  function searchUser() {
    document.querySelector(".loader_customer").style.display="inline-block";
    if(number){
      axios
      .get(process.env.REACT_APP_SERVER_URL + `/get-user/${number}`)
      .then((result) => {
        let { data } = result;
        if(data.length===0){
          // setDog(true);
          document.querySelector(".loader_customer").style.display="none";
          // const thElements = document.getElementsByTagName('th');
          // for (let i = 0; i < thElements.length; i++) {
          //   thElements[i].style.display = 'none';
          // }
          if(document.querySelector(".table_container")){
            document.querySelector(".table_container").style.display="none";
          }
          document.querySelector(".pagination").style.display="none";
        }else{
          setData([data]);
          // setDog(false);
          document.querySelector(".loader_customer").style.display="none";
          // const thElements = document.getElementsByTagName('th');
          // for (let i = 0; i < thElements.length; i++) {
          //   thElements[i].style.display = 'block';
          // }
          if(document.querySelector(".table_container")){
            document.querySelector(".table_container").style.display="flex";
          }
          document.querySelector(".pagination").style.display="block";
        }
        
      }).catch((e)=>{
      })
    } else{
      toast.info("Number length should be 10", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  const handlePhoneChange = (event) => {
    const inputPhoneNumber = event.target.value;

    if (!/[a-zA-Z]/.test(inputPhoneNumber)) {
      setMobile(inputPhoneNumber);
      setCustomerPhoneNumber(inputPhoneNumber)
    }
  };
  function edit(e){
    let tr = e.target.closest("tr");
    if (tr) {
      document.querySelector(".edit_container").style.display = "block"
      let tds = tr.querySelectorAll("td");
      let id = tds[0].textContent;
      let username = tds[1].textContent;
      let number = tds[2].textContent;
      let birthDay = tds[3].textContent;
      let weddingDay = tds[4].textContent;
      document.querySelector(".edit_name").value = username
      document.querySelector(".edit_number").value = number
      document.querySelector(".edit_birthday").value = birthDay
      document.querySelector(".edit_weddingday").value = weddingDay
      setId(id);
      setCustomerName(username);
      setCustomerPhoneNumber(number);
      setCustomerBirthdayDate(birthDay);
      setCustomerWeddingDate(weddingDay);
      };
    }
  function deleteCustomer(e){
    document.querySelector(".delete_container").style.display = "block";
    let tr = e.target.closest("tr");
    if (tr) {
      let tds = tr.querySelectorAll("td");
      let id = tds[0].textContent;
      setId(id)
    };
  }
  function save(){
    if(customerName && customerPhoneNumber && customerBirthdayDate && customerWeddingDate){
      axios.put(process.env.REACT_APP_SERVER_URL+"/edit-customer",{
        _id:id,
        customer_name:customerName,
        customer_phone_number:customerPhoneNumber,
        customer_birthday_date:customerBirthdayDate,
        customer_wedding_date:customerWeddingDate
      }).then((res)=>{
      document.querySelector(".edit_container").style.display = "none"
        axios.get(process.env.REACT_APP_SERVER_URL + "/sync").then((result) => {
          if(Object.keys(result.data).length){
              setData([result.data]);
            if(document.querySelector(".table_container")){
              document.querySelector(".table_container").style.display="flex";
            }
            if(document.querySelector(".search_container")){
              document.querySelector(".search_container").style.display="flex";
            }
            if(document.querySelector(".loader_customer")){
              document.querySelector(".loader_customer").style.display="none";
            }
            // if(document.querySelector(".edit_container")){
            //   document.querySelector(".edit_container").style.display="block"
            // }
            if(document.querySelector(".pagination")){
              document.querySelector(".pagination").style.display="block";
            }
            if(document.querySelector(".dog_saying_no_data_to_customer")){
              document.querySelector(".dog_saying_no_data_to_customer").style.display="none";
            }
            
          }else{
            if(document.querySelector(".loader_customer")){
              document.querySelector(".loader_customer").style.display="none";
            }
            // if(document.querySelector(".edit_container")){
            //   document.querySelector(".edit_container").style.display="none"
            // }
            if(document.querySelector(".table_container")){
              document.querySelector(".table_container").style.display="none";
            }
            if(document.querySelector(".search_container")){
              document.querySelector(".search_container").style.display="none";
            }
          if(document.querySelector(".pagination")){
            document.querySelector(".pagination").style.display="none";
          }
          if(document.querySelector(".dog_saying_no_data_to_customer")){
            document.querySelector(".dog_saying_no_data_to_customer").style.display="inline-block";
          }
          }
        }).catch((e)=>{
        })
        toast.success("Customer updated successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        document.querySelector(".edit_name").value = ""
        document.querySelector(".edit_number").value = ""
        document.querySelector(".edit_birthday").value = ""
        document.querySelector(".edit_weddingday").value = ""
      }).catch(e=>{
      })
    }
  }
  function cancelEdit(){
    document.querySelector(".edit_container").style.display = "none";

    // document.querySelector(".edit_name").value = ""
    // document.querySelector(".edit_number").value = ""
    // document.querySelector(".edit_birthday").value = ""
    // document.querySelector(".edit_weddingday").value = ""
  }

  function deleteYes(){
   axios.put(process.env.REACT_APP_SERVER_URL+`/deactivate-customer/${id}`).then((res)=>{
    document.querySelector(".delete_container").style.display = "none";
   }).catch(e=>{
   })
  }
  function deleteNo(){
    document.querySelector(".delete_container").style.display = "none";
  }
  return (
    <div onKeyDown={handleKeyDown} className="content">
      <Home />
      <div className="delete_container">
        <div className="delete_content">
          <h5>Would You like to delete the Customer?</h5>
          <button onClick={deleteYes} className="yes_delete">Yes</button>
          <button onClick={deleteNo} className="no_delete">No</button>
        </div>
      </div>
      <div className="search_container">
        <div className="search">
          <div>
            <h3 className="customer_heading">{datas.customer_details}</h3>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search User by Mobile Number"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={handleInputChange}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary customer_search_button"
                type="button"
                onClick={searchUser}
                ref={buttonRef}
              >
                Search
              </button>
              <button
                className="btn btn-outline-secondary reset_search_button"
                type="button"
                onClick={resetUser}
                // ref={}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="loader_customer"></div>
        </div>
      </div>
      <div className="edit_container">
        <div className="edit_content">
              <input type="text" className="edit_name" placeholder="Enter name" onChange={(e)=>setCustomerName(e.target.value)}/>
              <input type="tel" value={mobile || customerPhoneNumber}
              onChange={handlePhoneChange}
              maxLength = "10" class="edit_number" placeholder="Enter number"/>
              <input type="date" className="edit_birthday" onChange={(e)=>setCustomerBirthdayDate(e.target.value)}/>
              <input type="date" className="edit_weddingday" onChange={(e)=>setCustomerWeddingDate(e.target.value)}/>
              <button onClick={cancelEdit} className="cancel_btn">Cancel</button>
              <span><button onClick={save} className="save_edit_btn">Save</button></span>
        </div>
      </div>
      <div className="total_customer">
        <p>{
          "Total Customer = " + data.length
        }</p>
      </div>
      <div className="table_container">
        <table className="table customer_table">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Birthday</th>
              <th scope="col">Wedding Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
            <tbody>
              {data.slice(offset, offset + PER_PAGE).map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td style={{display:"none"}}>{item._id}</td>
                    <td>{item.customer_name}</td>
                    <td>{item.customer_phone_number}</td>
                    <td>{item.customer_birthday_date}</td>
                    <td>{item.customer_wedding_date}</td>
                    <td>
                    <span><button onClick={edit} className="edit">Edit</button></span>
                    <span><button onClick={deleteCustomer} className="delete">Delete</button></span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
        </table>
      </div>
      
            <div className="dog_saying_no_data_to_customer" style={{
              display:"none"
            }}>
              <img src={myImage} alt="dog" style={{
                width:100,
                height:150
              }}/>
              <h2>No data available</h2>
            </div>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
      <Footer />
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

export default Customer;
