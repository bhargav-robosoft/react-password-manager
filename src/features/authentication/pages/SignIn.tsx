import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setToken } from "../../../utils/storage";
import { emailValidator, passwordValidator } from "../../../utils/validators";

import { signInApi } from "../../../api/auth";

import { AppDispatch } from "../../../store";
import { authActions } from "../../../store/auth-slice";
import { setUiMessage } from "../../../store/ui-actions";

import commonClasses from "./Authentication.module.scss";
import classes from "./SignIn.module.scss";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import LoadingImg from "../../../components/ui/LoadingImg";

const SignIn = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [emailTouched, setEmailTouched] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false);

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const emailHandler = (value: string) => {
    if (!emailTouched) {
      setEmailTouched(true);
    }

    setEmail(value);
  };

  const passwordHandler = (value: string) => {
    if (!passwordTouched) {
      setPasswordTouched(true);
    }

    setPassword(value);
  };

  const submitHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);
    setFormSubmitted(true);

    if (
      emailValidator(email) === null &&
      passwordValidator(password) === null
    ) {
      setIsLoading(true);
      const response = await signInApi(email, password);
      const decodedResponse = await response.json();
      setIsLoading(false);
      if (decodedResponse["status"] === 200) {
        setToken(response.headers.get("Authorization") as string);
        navigate("../../home");
        dispatch(authActions.signIn());
      } else {
        dispatch(setUiMessage(decodedResponse["message"], true));
      }
    }
  };

  return (
    <div className={commonClasses["auth-type-container"]}>
      <div className={commonClasses["auth-heading"]}>
        SIGN IN TO YOUR ACCOUNT
      </div>
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
          <Input
            id="password"
            label="Password"
            showlabel={false}
            type="password"
            value={password}
            placeholder="Enter password"
            touched={passwordTouched}
            formSubmitted={formSubmitted}
            onInput={passwordHandler}
            validator={passwordValidator}
            formGroupClass={commonClasses["form-group"]}
            invalidClass={commonClasses["invalid"]}
            invalidInputClass={commonClasses["input-error"]}
          />
        </div>
        <div className={classes["forgot-password"]}>
          <Link className={commonClasses["auth-link"]} to="../forgot-password">
            Forgot your password?
          </Link>
        </div>
        <Button
          label="SIGN IN"
          disabled={isLoading}
          onClick={submitHandler}
          className={[commonClasses.button, classes["sign-in-button"]].join(
            " "
          )}
          children={isLoading && <LoadingImg />}
        />
        <div className={classes["sign-up"]}>
          <Link
            className={commonClasses["auth-link"]}
            to="../sign-up"
            relative="path"
          >
            Don’t have a Account? SIGNUP
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
