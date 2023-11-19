import React from "react";

import commonClasses from "./Authentication.module.scss";

import GenerateVerifySet from "../components/generate-verify-set/GenerateVerifySet";

const ForgotPassword = (): JSX.Element => {
  return (
    <div className={commonClasses["auth-type-container"]}>
      <div className={`${commonClasses["auth-heading"]} ${commonClasses["forgot"]}`}>FORGOT PASSWORD</div>
      <GenerateVerifySet type="forgot-password" />
    </div>
  );
};

export default ForgotPassword;
