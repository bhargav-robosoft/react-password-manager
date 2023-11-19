import ReactDOM from "react-dom";

import classes from "./Modal.module.scss";

import Backdrop from "./Backdrop";

const ModalOverlay = ({ children }: React.PropsWithChildren): JSX.Element => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = ({
  onClose,
  children,
}: React.PropsWithChildren<{ onClose: () => void }>): JSX.Element => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement!)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement!
      )}
    </>
  );
};

export default Modal;
