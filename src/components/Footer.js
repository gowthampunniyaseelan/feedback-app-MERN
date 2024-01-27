import React from "react";
import "./Footer.css";
import datas from "./common.json"
function Footer() {
  return (
    <div>
      <div className="footer">
        <p className="footer_name">{datas.footer}</p>
      </div>
    </div>
  );
}

export default Footer;
