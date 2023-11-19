import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteToken } from "../../../utils/storage";

import { signoutApi } from "../../../api/auth";

import { AppDispatch } from "../../../store";
import { authActions } from "../../../store/auth-slice";

import changePassword from "../../../assets/icons/change-password.png";
import menu from "../../../assets/icons/menu.png";
import profile from "../../../assets/icons/profile.png";
import signOut from "../../../assets/icons/sign-out.png";

import classes from "./Header.module.scss";

import Logo from "../../../components/Logo";
import Toast from "../../../components/ui/Toast";

type HeaderProps = {
  onOpenDrawer: () => void;
  onChangePassword: () => void;
};

const Header = ({
  onOpenDrawer,
  onChangePassword,
}: React.PropsWithChildren<HeaderProps>): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={classes.header}>
      <button className={classes.menu} onClick={onOpenDrawer}>
        <img src={menu} alt="Menu" />
      </button>
      <Logo />
      <Toast uiClass={classes["ui-message"]} />
      <div className={classes.icons}>
        <div className={classes["profile-dropdown"]}>
          <button>
            <img src={profile} alt="Profile" />
          </button>
          <div className={classes["dropdown-content"]}>
            <button onClick={onChangePassword}>
              <span>Change Password</span>
              <span className={classes.img}>
                <img src={changePassword} alt="Change Password" />
              </span>
            </button>
            <div className={classes.divider}></div>
            <button
              onClick={() => {
                signoutApi();
                deleteToken();
                navigate("../auth/sign-in");
                dispatch(authActions.signOut());
              }}
            >
              <span>Sign Out</span>
              <span className={classes.img}>
                <img src={signOut} alt="Sign Out" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
