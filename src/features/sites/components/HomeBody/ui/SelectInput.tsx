import React from "react";

type SelectInputProps = {
  id: string;
  label: string;
  options: string[];
  value: string;
  touched: boolean;
  formSubmitted: boolean;
  disabled?: boolean;
  onInput: (value: string) => void;
  validator: (value: string) => string | null;
  defaultClass: string;
  formGroupClass: string;
  invalidClass: string;
  invalidInputClass: string;
};

const SelectInput = ({
  id,
  label,
  options,
  value,
  touched,
  formSubmitted,
  disabled = false,
  onInput,
  validator,
  defaultClass,
  formGroupClass,
  invalidClass,
  invalidInputClass,
}: React.PropsWithChildren<SelectInputProps>): JSX.Element => {
  const invalid = formSubmitted && touched && validator(value) !== null;

  return (
    <div className={formGroupClass}>
      <label htmlFor={id}>{label}</label>
      <select
        onChange={(event) => onInput(event.target.value)}
        id={id}
        className={[
          value === "" ? defaultClass : "",
          invalid ? invalidClass : "",
        ].join(" ")}
        value={value}
        disabled={disabled}
      >
        {disabled && <option>{value}</option>}
        {!disabled && (
          <>
            <option value="" key="">
              Open this select menu
            </option>
            {options.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </>
        )}
      </select>
      {invalid && <div className={invalidInputClass}>{validator(value)}</div>}
    </div>
  );
};

export default SelectInput;
