import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { otpValidator } from "../../../../utils/validators";
import { getCounterTime } from "../../../../utils/utilities";

import { generateOtpForRegisterApi, verifyOtpApi } from "../../../../api/auth";

import { AppDispatch } from "../../../../store";
import { setUiMessage } from "../../../../store/ui-actions";

import commonClasses from "../../pages/Authentication.module.scss";
import classes from "./GenerateVerifySet.module.scss";

import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import LoadingImg from "../../../../components/ui/LoadingImg";

type VerifyOtpProps = {
  type: "sign-up" | "forgot-password";
  email: string;
  expiresAt: Date;
  onOtpVerify: (timestamp: Date) => void;
};

const VerifyOtp = ({
  type,
  email,
  expiresAt,
  onOtpVerify,
}: React.PropsWithChildren<VerifyOtpProps>): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const [expiry, setExpiry] = useState<Date>(expiresAt);
  const [counter, setCounter] = useState<{
    minutes: number;
    seconds: number;
  }>(getCounterTime(expiry));

  const counterValid = counter.minutes !== 0 || counter.seconds !== 0;

  useEffect(() => {
    if (counterValid) {
      const interval = setInterval(() => {
        setCounter(getCounterTime(expiry));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [counter, counterValid, expiry]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [otp, setOtp] = useState<string>("");
  const [otpTouched, setOtpTouched] = useState<boolean>(false);

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const [disableButton, setDisableButton] = useState<boolean>(false);

  const otpHandler = (value: string) => {
    if (!otpTouched) {
      setOtpTouched(true);
    }

    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const verifyOtpHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setOtpTouched(true);
    setFormSubmitted(true);

    if (otpValidator(otp) === null) {
      setIsLoading(true);
      const response = await verifyOtpApi(email, otp);
      const decodedResponse = await response.json();
      setIsLoading(false);

      if (decodedResponse["status"] === 200) {
        onOtpVerify(new Date(decodedResponse["expiresAt"]));
        dispatch(setUiMessage(decodedResponse["message"], false));
      } else {
        dispatch(setUiMessage(decodedResponse["message"], true));
      }
    }
  };

  const regenerateOtpHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    setIsLoading(true);
    const response = await generateOtpForRegisterApi(email);
    const decodedResponse = await response.json();
    setIsLoading(false);
    if (decodedResponse["status"] === 200) {
      dispatch(setUiMessage(decodedResponse["message"], false));
      setExpiry(new Date(decodedResponse["expiresAt"]));
      setCounter(getCounterTime(new Date(decodedResponse["expiresAt"])));
    } else {
      dispatch(setUiMessage(decodedResponse["message"], true));
      setDisableButton(false);
    }
  };

  return (
    <form>
      <div className={commonClasses["auth-inputs"]}>
        <div className={classes["verify-otp-text"]}>
          OTP is sent to your email
        </div>
        <Input
          id="otp"
          label="OTP"
          showlabel={false}
          type="number"
          maxLength={6}
          value={otp}
          placeholder="Enter 6 digit OTP"
          touched={otpTouched}
          formSubmitted={formSubmitted}
          onInput={otpHandler}
          validator={otpValidator}
          formGroupClass={commonClasses["form-group"]}
          invalidClass={commonClasses["invalid"]}
          invalidInputClass={commonClasses["input-error"]}
        />
      </div>
      {counterValid && (
        <div className={classes["otp-timer"]}>
          OTP expires in {counter.minutes}:{("00" + counter.seconds).slice(-2)}
        </div>
      )}
      {!counterValid && <div className={classes["otp-timer"]}>OTP expired</div>}
      <div className={classes["verify-otp-action-buttons"]}>
        <Button
          label={counterValid ? "VERIFY" : "REGENERATE"}
          disabled={isLoading || disableButton}
          onClick={counterValid ? verifyOtpHandler : regenerateOtpHandler}
          className={[
            commonClasses.button,
            counterValid
              ? classes["verify-otp-button"]
              : classes["regenerate-otp-button"],
          ].join(" ")}
          children={
            isLoading ? <LoadingImg /> : disableButton && <span>Disabled</span>
          }
        />
        <Link
          className={commonClasses["auth-link"]}
          to={type === "sign-up" ? "../sign-in" : "../sign-up"}
          relative="path"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default VerifyOtp;
