import React from "react";

import back from "../assets/icons/back.png";

import classes from "./AppBar.module.scss";

import Logo from "./Logo";

type AppBarProps = {
    onBack: () => void;
};

const AppBar = ({
    onBack,
}: React.PropsWithChildren<AppBarProps>): JSX.Element => {
  return (
    <div className={classes["app-bar"]}>
      <button className={classes.back} onClick={onBack}>
        <img src={back} alt="Back" />
      </button>
      <Logo />
    </div>
  );
};

export default AppBar;
