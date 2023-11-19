import React from "react";

import classes from "./Backdrop.module.scss";

const Backdrop = ({
  onClose,
}: React.PropsWithChildren<{ onClose: () => void }>): JSX.Element => {
  return <div className={classes.backdrop} onClick={onClose} />;
};

export default Backdrop;
