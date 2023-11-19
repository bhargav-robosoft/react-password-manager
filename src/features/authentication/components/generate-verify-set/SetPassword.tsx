import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { passwordValidator as utilPasswordValidator } from "../../../../utils/validators";

import { forgotPasswordApi, signUpApi } from "../../../../api/auth";

import { AppDispatch } from "../../../../store";
import { setUiMessage } from "../../../../store/ui-actions";

import commonClasses from "../../pages/Authentication.module.scss";
import classes from "./GenerateVerifySet.module.scss";

import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import LoadingImg from "../../../../components/ui/LoadingImg";

type SetPasswordProps = {
  type: "sign-up" | "forgot-password";
  email: string;
  onSet: () => void;
};

const SetPassword = ({
  type,
  email,
  onSet,
}: React.PropsWithChildren<SetPasswordProps>): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false);

  const [passwordRe, setPasswordRe] = useState<string>("");
  const [passwordReTouched, setPasswordReTouched] = useState<boolean>(false);

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const passwordHandler = (value: string) => {
    if (!passwordTouched) {
      setPasswordTouched(true);
    }

    setPassword(value);
  };

  const passwordReHandler = (value: string) => {
    if (!passwordReTouched) {
      setPasswordReTouched(true);
    }

    setPasswordRe(value);
  };

  const passwordValidator = () => {
    if (
      utilPasswordValidator(password) === null &&
      utilPasswordValidator(passwordRe) === null
    ) {
      if (password !== passwordRe) {
        return "Passwords do not match";
      } else {
        return null;
      }
    } else {
      return "Password is required";
    }
  };

  const submitHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setPasswordTouched(true);
    setPasswordReTouched(true);
    setFormSubmitted(true);

    if (passwordValidator() === null) {
      setIsLoading(true);
      var response: Response;
      if (type === "sign-up") {
        response = await signUpApi(email, password);
      } else {
        response = await forgotPasswordApi(email, password);
      }
      const decodedResponse = await response!.json();
      setIsLoading(false);

      if (decodedResponse["status"] === 200) {
        dispatch(setUiMessage(decodedResponse["message"], false));
        onSet();
      } else {
        dispatch(setUiMessage(decodedResponse["message"], true));
      }
    }
  };

  return (
    <form>
      <div className={commonClasses["auth-inputs"]}>
        <Input
          id="password"
          label="Password"
          showlabel={false}
          type="password"
          value={password}
          placeholder="Enter password"
          touched={passwordTouched}
          formSubmitted={formSubmitted}
          showErrors={false}
          onInput={passwordHandler}
          validator={utilPasswordValidator}
          formGroupClass={commonClasses["form-group"]}
          invalidClass={commonClasses["invalid"]}
          invalidInputClass={commonClasses["input-error"]}
        />
        <Input
          id="passwordre"
          label="Re-enter Password"
          showlabel={false}
          type="password"
          value={passwordRe}
          placeholder="Re-enter password"
          touched={passwordReTouched}
          formSubmitted={formSubmitted}
          showErrors={false}
          onInput={passwordReHandler}
          validator={utilPasswordValidator}
          formGroupClass={commonClasses["form-group"]}
          invalidClass={commonClasses["invalid"]}
          invalidInputClass={commonClasses["input-error"]}
        />
      </div>
      {formSubmitted && passwordValidator() && (
        <div className={commonClasses["form-error"]}>{passwordValidator()}</div>
      )}
      <Button
        label="SIGN UP"
        disabled={isLoading}
        onClick={submitHandler}
        className={[commonClasses.button, classes["sign-up-button"]].join(" ")}
        children={isLoading && <LoadingImg />}
      />
    </form>
  );
};

export default SetPassword;
