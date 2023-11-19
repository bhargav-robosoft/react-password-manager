import React, { useState } from "react";

import { sitePasswordStrength } from "../../../../../utils/validators";

import view from "../../../../../assets/icons/view.png";
import hide from "../../../../../assets/icons/hide.png";

import classes from "./PasswordInput.module.scss";

type PassowrdInputProps = {
  id: string;
  label: string;
  value: string;
  touched: boolean;
  placeholder?: string;
  formSubmitted: boolean;
  disabled?: boolean;
  onInput: (value: string) => void;
  validator: (value: string) => string | null;
  invalidInputClass: string;
};

const PasswordInput = ({
  id,
  label,
  value,
  touched,
  placeholder,
  formSubmitted,
  disabled = false,
  onInput,
  validator,
  invalidInputClass,
}: React.PropsWithChildren<PassowrdInputProps>): JSX.Element => {
  const invalid = formSubmitted && touched && validator(value) !== null;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className={classes["form-control"]}>
      <label htmlFor={id}>{label}</label>
      <div
        className={[
          classes["password-field"],
          invalid ? classes.invalid : "",
        ].join(" ")}
      >
        <div className={classes["password-input"]}>
          <input
            id={id}
            type={showPassword ? "text" : "password"}
            onChange={(event) => {
              onInput(event.target.value);
            }}
            value={value}
            placeholder={placeholder}
            size={1}
            disabled={disabled}
          />
          <button
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              event.preventDefault();
              setShowPassword((prevValue) => !prevValue);
            }}
          >
            {showPassword ? (
              <img src={view} alt="View Password" />
            ) : (
              <img src={hide} alt="Hide Password" />
            )}
          </button>
        </div>
        <div
          className={classes.strength}
          style={{ width: `${sitePasswordStrength(value)}%` }}
        ></div>
      </div>
      {invalid && <div className={invalidInputClass}>{validator(value)}</div>}
    </div>
  );
};

export default PasswordInput;
