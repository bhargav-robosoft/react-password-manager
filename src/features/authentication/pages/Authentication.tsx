import React, { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { deleteToken } from "../../../utils/storage";

import { checkTokenApi } from "../../../api/auth";

import { AppDispatch, RootState } from "../../../store";
import { authActions } from "../../../store/auth-slice";
import { setUiMessage } from "../../../store/ui-actions";

import logo from "../../../assets/logo.svg";

import classes from "./Authentication.module.scss";

import Toast from "../../../components/ui/Toast";

const Authentication = (): JSX.Element => {
  const route = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isSignedIn = useSelector((state: RootState) => state.auth).isSignedIn;

  useEffect(() => {
    if (isSignedIn) {
      navigate("../home");
    } else {
      const checkTokenHandler = async () => {
        const response = await checkTokenApi();
        const decodedResponse = await response.json();

        if (decodedResponse["status"] === 200) {
          navigate("../home");
          dispatch(authActions.signIn());
        } else {
          if (decodedResponse["sessionTimedOut"]) {
            dispatch(setUiMessage("Session Timed Out", true));
            deleteToken();
          } else {
          }
        }
      };

      checkTokenHandler();
    }
  }, [navigate, dispatch, isSignedIn]);

  return (
    <>
      <Toast uiClass={classes["ui-message"]} />
      <div className={classes.container}>
        <div className={classes["auth-container"]}>
          <div className={classes["left-part"]}>
            <img src={logo} alt="Password Manager Logo" />
            <div className={classes["logo-description-mobile"]}>
              <span>PASS</span>
              <span>MANAGER</span>
            </div>
            <div className={classes["logo-description"]}>
              Protect & Manage every password in your business
            </div>
          </div>
          <div className={classes["right-part"]}>
            {(route.pathname === "/auth/sign-in" ||
              route.pathname === "/auth/sign-up") && (
              <div className={classes["headings"]}>
                <button
                  className={
                    route.pathname === "/auth/sign-in" ? classes.active : ""
                  }
                  onClick={() => navigate("sign-in")}
                >
                  SIGN IN
                </button>
                <button
                  className={
                    route.pathname === "/auth/sign-up" ? classes.active : ""
                  }
                  onClick={() => navigate("sign-up")}
                >
                  SIGN UP
                </button>
              </div>
            )}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
