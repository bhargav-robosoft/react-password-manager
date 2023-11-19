import React from "react";
import { Link } from "react-router-dom";

import commonClasses from "./Authentication.module.scss";
import classes from "./SignUp.module.scss";

import GenerateVerifySet from "../components/generate-verify-set/GenerateVerifySet";

const SignUp = (): JSX.Element => {
  return (
    <div className={commonClasses["auth-type-container"]}>
      <div className={commonClasses["auth-heading"]}>SIGN UP</div>
      <GenerateVerifySet type="sign-up" />
      <div className={classes["sign-in"]}>
        <Link
          className={commonClasses["auth-link"]}
          to="../sign-in"
          relative="path"
        >
          Already have an account? SIGN IN
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
