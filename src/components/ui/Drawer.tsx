import React from "react";
import ReactDOM from "react-dom";

import classes from "./Drawer.module.scss";

import Backdrop from "./Backdrop";

const portalElement = document.getElementById("overlays");

const Drawer = ({
  onClose,
  children,
}: React.PropsWithChildren<{ onClose: () => void }>) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement!)}
      {ReactDOM.createPortal(
        <div className={classes.drawer}>{children}</div>,
        portalElement!
      )}
    </>
  );
};

export default Drawer;
