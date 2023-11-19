import { AppDispatch } from ".";
import Site from "../models/Site";
import { delay } from "../utils/utilities";
import { uiActions } from "./ui-slice";

export const addSite = (site: Site) => {
  return async (dispatch: AppDispatch) => {
    // dispatch(
    //   uiActions.setMessage({
    //     message,
    //     isError,
    //   })
    // );

    // await delay(5000);

    // dispatch(uiActions.clear());
  };
};
