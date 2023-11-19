import React from "react";

type ButtonProps = {
  label: string;
  disabled?: boolean;
  className?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button = ({
  label,
  disabled,
  onClick,
  className: classes,
  children,
}: React.PropsWithChildren<ButtonProps>): JSX.Element => {
  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children ? children : label}
    </button>
  );
};

export default Button;
