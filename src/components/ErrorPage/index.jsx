import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const ErrorPage = () => {
  return (
    <div className="Error_stage">
      <h2> Uppps...tady nic není</h2>
      <div className="Stage_page_container">
        <button className="Start_page_button">
          <Link to="/">Zpět na úvodní stranu</Link>
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
