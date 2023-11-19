import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { passwordValidator as utilPasswordValidator } from "../../../utils/validators";

import { deleteToken, setToken } from "../../../utils/storage";

import { resetPasswordApi } from "../../../api/auth";

import { AppDispatch } from "../../../store";
import { authActions } from "../../../store/auth-slice";
import { setUiMessage } from "../../../store/ui-actions";

import classes from "./ChangePasswordModal.module.scss";

import AppBar from "../../../components/AppBar";
import Loader from "../../../components/ui/Loader";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

type ChangePasswordModalProps = {
  onClose: () => void;
};

const ChangePasswordModal = ({
  onClose,
}: React.PropsWithChildren<ChangePasswordModalProps>): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [oldPassword, setOldPassword] = useState<string>("");
  const [oldPasswordTouched, setOldPasswordTouched] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false);

  const [passwordRe, setPasswordRe] = useState<string>("");
  const [passwordReTouched, setPasswordReTouched] = useState<boolean>(false);

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const oldPasswordHandler = (value: string) => {
    if (!oldPasswordTouched) {
      setOldPasswordTouched(true);
    }

    setOldPassword(value);
  };

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
        return "New Passwords do not match";
      } else {
        return null;
      }
    } else {
      return "New Password is required";
    }
  };

  const submitHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setOldPasswordTouched(true);
    setPasswordTouched(true);
    setPasswordReTouched(true);
    setFormSubmitted(true);

    if (passwordValidator() === null) {
      setIsLoading(true);
      var response: Response;
      response = await resetPasswordApi(oldPassword, password);
      const decodedResponse = await response!.json();
      setIsLoading(false);

      if (decodedResponse["status"] === 200) {
        setToken(response.headers.get("Authorization") as string);
        dispatch(setUiMessage(decodedResponse["message"], false));
        onClose();
      } else {
        if (decodedResponse["sessionTimedOut"]) {
          dispatch(setUiMessage("Session Timed Out", true));
          dispatch(authActions.signOut());
          deleteToken();
          navigate("../auth/sign-in");
        } else {
          setError(decodedResponse["message"]);
        }
      }
    }
  };

  return (
    <>
      <AppBar onBack={onClose} />
      {isLoading && <Loader />}
      <div className={classes["modal-body"]}>
        <div className={classes.title}>Change Password</div>
        <form className={classes.form}>
          <Input
            id="oldpassword"
            label="Old Password"
            showlabel={true}
            type="password"
            value={oldPassword}
            placeholder="Enter old password"
            touched={oldPasswordTouched}
            formSubmitted={formSubmitted}
            showErrors={true}
            onInput={oldPasswordHandler}
            validator={utilPasswordValidator}
            formGroupClass={classes["form-control"]}
            invalidClass={classes["invalid"]}
            invalidInputClass={classes["input-error"]}
          />
          <Input
            id="password"
            label="New Password"
            showlabel={true}
            type="password"
            value={password}
            placeholder="Enter new password"
            touched={passwordTouched}
            formSubmitted={formSubmitted}
            showErrors={false}
            onInput={passwordHandler}
            validator={utilPasswordValidator}
            formGroupClass={classes["form-control"]}
            invalidClass={classes["invalid"]}
            invalidInputClass={classes["input-error"]}
          />
          <Input
            id="passwordre"
            label="Re-enter New Password"
            showlabel={true}
            type="password"
            value={passwordRe}
            placeholder="Re-enter new password"
            touched={passwordReTouched}
            formSubmitted={formSubmitted}
            showErrors={false}
            onInput={passwordReHandler}
            validator={utilPasswordValidator}
            formGroupClass={classes["form-control"]}
            invalidClass={classes["invalid"]}
            invalidInputClass={classes["input-error"]}
          />
          {error !== "" && (
            <div className={classes["input-error"]}>{error}</div>
          )}
          {formSubmitted && passwordValidator() && (
            <div className={classes["input-error"]}>{passwordValidator()}</div>
          )}
          <div className={classes["action-buttons"]}>
            <Button
              label="Reset"
              disabled={isLoading}
              onClick={submitHandler}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePasswordModal;
