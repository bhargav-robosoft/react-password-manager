import React from "react";

import logo from "../assets/logo-small.svg";

import classes from "./Logo.module.scss";

const Logo = (): JSX.Element => {
  return (
    <div className={classes["logo-name"]}>
      <img className={classes.logo} src={logo} alt="Password Manager" />
      <div className={classes.name}>
        <div>PASS</div>
        <div>MANAGER</div>
      </div>
    </div>
  );
};

export default Logo;
