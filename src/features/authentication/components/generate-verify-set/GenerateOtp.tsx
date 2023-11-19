import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { emailValidator } from "../../../../utils/validators";

import {
  generateOtpForRegisterApi,
  generateOtpForResetPasswordApi,
} from "../../../../api/auth";

import { AppDispatch } from "../../../../store";
import { setUiMessage } from "../../../../store/ui-actions";

import commonClasses from "../../pages/Authentication.module.scss";
import classes from "./GenerateVerifySet.module.scss";

import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import LoadingImg from "../../../../components/ui/LoadingImg";

type GenerateOtpProps = {
  type: "sign-up" | "forgot-password";
  onOtpGenerated: (email: string, timestamp: Date) => void;
};

const GenerateOtp = ({
  type,
  onOtpGenerated,
}: React.PropsWithChildren<GenerateOtpProps>): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [emailTouched, setEmailTouched] = useState<boolean>(false);

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const emailHandler = (value: string) => {
    if (!emailTouched) {
      setEmailTouched(true);
    }

    setEmail(value);
  };

  const submitHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setEmailTouched(true);
    setFormSubmitted(true);

    if (emailValidator(email) === null) {
      setIsLoading(true);
      var response: Response;
      if (type === "sign-up") {
        response = await generateOtpForRegisterApi(email);
      } else {
        response = await generateOtpForResetPasswordApi(email);
      }
      const decodedResponse = await response.json();
      setIsLoading(false);
      if (decodedResponse["status"] === 200) {
        dispatch(setUiMessage(decodedResponse["message"], false));
        onOtpGenerated(email, new Date(decodedResponse["expiresAt"]));
      } else {
        dispatch(setUiMessage(decodedResponse["message"], true));
      }
    }
  };

  return (
    <form>
      <div className={commonClasses["auth-inputs"]}>
        <Input
          id="email"
          label="Email"
          showlabel={false}
          type="email"
          value={email}
          placeholder="Enter email"
          touched={emailTouched}
          formSubmitted={formSubmitted}
          onInput={emailHandler}
          validator={emailValidator}
          formGroupClass={commonClasses["form-group"]}
          invalidClass={commonClasses["invalid"]}
          invalidInputClass={commonClasses["input-error"]}
        />
      </div>
      {type === "forgot-password" && (
        <div className={classes["right-cancel"]}>
          <Link
            className={commonClasses["auth-link"]}
            to="../sign-in"
            relative="path"
          >
            Cancel
          </Link>
        </div>
      )}
      <Button
        label="GET OTP"
        disabled={isLoading}
        onClick={submitHandler}
        className={[commonClasses.button, classes["generate-otp-button"]].join(
          " "
        )}
        children={isLoading && <LoadingImg />}
      />
    </form>
  );
};

export default GenerateOtp;
