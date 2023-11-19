import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import GenerateOtp from "./GenerateOtp";
import VerifyOtp from "./VerifyOtp";
import SetPassword from "./SetPassword";

const GenerateVerifySet = ({
  type,
}: React.PropsWithChildren<{
  type: "sign-up" | "forgot-password";
}>): JSX.Element => {
  const navigate = useNavigate();
  const [routeType, setRouteType] = useState<string>("generate");
  const [email, setEmail] = useState<string>("");
  const [timestamp, setTimestamp] = useState<Date>();

  const setHandler = () => {
    navigate("../sign-in");
  };

  return (
    <>
      {routeType === "generate" && (
        <GenerateOtp
          type={type}
          onOtpGenerated={(emailValue, timestampValue) => {
            setEmail(emailValue);
            setTimestamp(timestampValue);
            setRouteType("verify");
          }}
        />
      )}
      {routeType === "verify" && (
        <VerifyOtp
          type={type}
          email={email}
          expiresAt={timestamp!}
          onOtpVerify={(timestampValue) => {
            setTimestamp(timestampValue);
            setRouteType("set-password");
          }}
        />
      )}
      {routeType === "set-password" && (
        <SetPassword type={type} email={email} onSet={setHandler} />
      )}
    </>
  );
};

export default GenerateVerifySet;
