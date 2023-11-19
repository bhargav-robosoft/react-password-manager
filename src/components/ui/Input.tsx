import React from "react";

type InputProps = {
  id: string;
  label: string;
  showlabel?: boolean;
  type: string;
  maxLength?: number;
  value: string;
  touched: boolean;
  placeholder?: string;
  formSubmitted: boolean;
  showErrors?: boolean;
  disabled?: boolean;
  onInput: (value: string) => void;
  validator: (value: string) => string | null;
  formGroupClass: string;
  invalidClass: string;
  invalidInputClass: string;
};

const Input = ({
  id,
  label,
  showlabel = true,
  type,
  maxLength,
  value,
  touched,
  placeholder,
  formSubmitted,
  showErrors = true,
  disabled = false,
  onInput,
  validator,
  formGroupClass,
  invalidClass,
  invalidInputClass,
}: React.PropsWithChildren<InputProps>): JSX.Element => {
  const invalid = formSubmitted && touched && validator(value) !== null;

  return (
    <div className={formGroupClass}>
      {showlabel && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        maxLength={type === "number" ? maxLength : undefined}
        onChange={(event) => {
          onInput(event.target.value);
        }}
        value={value}
        placeholder={placeholder}
        className={[invalid ? invalidClass : ""].join(" ")}
        size={1}
        disabled={disabled}
      />
      {invalid && showErrors && (
        <div className={invalidInputClass}>{validator(value)}</div>
      )}
    </div>
  );
};

export default Input;
