import React, { useState } from "react";
import ReactDOM from "react-dom";

import classes from "./Drawer.module.scss";

import Backdrop from "./Backdrop";

const portalElement = document.getElementById("overlays");

const Drawer = ({
  onClose,
  children,
}: React.PropsWithChildren<{ onClose: () => void }>) => {
  const [closing, setClosing] = useState<boolean>(false);
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop
          onClose={() => {
            setClosing(true);
            setTimeout(() => {
              onClose();
            }, 300)
          }}
        />,
        portalElement!
      )}
      {ReactDOM.createPortal(
        <div
          className={[classes.drawer, closing ? classes.close : ""].join(" ")}
        >
          {children}
        </div>,
        portalElement!
      )}
    </>
  );
};

export default Drawer;
