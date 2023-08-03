import React from "react";
import { a, useNavigate } from "react-router-dom";
import Images from "../../theme/Images";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { lOGIN_ROUTE } from "../../constants";
import { userSignOutSuccess } from "../../redux/slicers/user";
import { storeSummarry } from "../../redux/slicers/general";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(userSignOutSuccess());
    dispatch(storeSummarry([]));
    navigate(lOGIN_ROUTE);
  };

  const handleLogin = () => {
    navigate(lOGIN_ROUTE);
  };
  return (
    <div className="main-header">
      <span className="logo-cont">
        <img src={Images.Logo} alt="" />
        <h3>YOUTUBE TRANSCRIPT SUMMARIZER</h3>
      </span>
      <span className="header-links-cont">
        <p className="header-links" onClick={() => navigate("/")}>
          Home
        </p>
        {isAuthenticated && (
          <p className="header-links" onClick={() => navigate("/summarize")}>
            Summarize Now
          </p>
        )}
        {isAuthenticated ? (
          <p className="header-links" onClick={handleLogout}>
            Logout
          </p>
        ) : (
          <p className="header-links" onClick={handleLogin}>
            Login
          </p>
        )}
      </span>
    </div>
  );
};

export default Header;
