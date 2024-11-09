// import "../css/TopNavber.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
const TopHeader = () => {
  const [isResponsive, setIsResponsive] = useState(false);

  const toggleNav = () => {
    setIsResponsive(!isResponsive);
  };
  return (
    <>
        <div className={`topnav ${isResponsive ? 'responsive' : ''}`} id="myTopnav">
        <div>
          <Link to="/" className="title" title="PDFNinjaTool">
          {/* PDFNinjaTool */}
            <img src="image/logo.png" alt="" className="logo"/>
          </Link>
        </div>
        <a href="" className="nav-item">PDF Tool</a>
        <a className="icon" onClick={toggleNav}>
        <img src="/image/bars-solid.svg" alt="Menu" width={"20px"}/>
      </a>
      </div>
    </>
  );
};
export default TopHeader;
