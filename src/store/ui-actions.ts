import { AppDispatch } from ".";
import { delay } from "../utils/utilities";
import { uiActions } from "./ui-slice";

export const setUiMessage = (message: string, isError: boolean) => {
  return async (dispatch: AppDispatch) => {
    dispatch(
      uiActions.setMessage({
        message,
        isError,
      })
    );

    await delay(3000);

    dispatch(uiActions.clear());
  };
};
