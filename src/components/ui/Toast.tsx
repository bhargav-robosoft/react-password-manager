import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../store";
import { uiActions } from "../../store/ui-slice";

import classes from "./Toast.module.scss";

const Toast = ({
  uiClass,
}: React.PropsWithChildren<{ uiClass: string }>): JSX.Element => {
  const uiState = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      {uiState.showMessage && (
        <div className={uiClass}>
          <div
            className={[
              classes["ui-message-content"],
              uiState.isError
                ? classes["ui-message-error"]
                : classes["ui-message-success"],
            ].join(" ")}
          >
            <div>{uiState.message}</div>
            <button
              onClick={() => {
                dispatch(uiActions.hideMessage());
              }}
            >
              x
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
