import React from 'react';
import "./NotFoundPage.css";
const NotFoundPage = () => {
  function redirectToHomepage(){
    window.location.href = "/customer"
  }
  return (
    <div className='not_found_page'>
      <div>
      <h1>404 - Page Not Found</h1>
      <p className='not_found_text'>The page you are looking for could not be found.</p>
      <div className='go_to_home_page_container'>
        <button className='go_to_home_page_btn' onClick={redirectToHomepage}>Go to home page</button>
      </div>
      </div>
    </div>
  );
};

export default NotFoundPage;



