import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteToken } from "../../../utils/storage";

import { signoutApi } from "../../../api/auth";

import { AppDispatch } from "../../../store";
import { authActions } from "../../../store/auth-slice";

import search from "../../../assets/icons/search-grey.png";
import addSite from "../../../assets/icons/add.png";
import changePassword from "../../../assets/icons/change-password.png";
import signOut from "../../../assets/icons/sign-out.png";

import classes from "./DrawerBody.module.scss";

type DrawerBodyProps = {
  onSearch: () => void;
  onAddSite: () => void;
  onPasswordChange: () => void;
};

const DrawerBody = ({
  onSearch,
  onAddSite,
  onPasswordChange,
}: React.PropsWithChildren<DrawerBodyProps>): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={classes["drawer-body"]}>
      <button onClick={onSearch}>
        <span>Search</span>
        <span className={classes.img}>
          <img src={search} alt="Search" />
        </span>
      </button>
      <button onClick={onAddSite}>
        <span>Add Site</span>
        <span className={classes.img}>
          <img src={addSite} alt="Add Site" />
        </span>
      </button>
      <button onClick={onPasswordChange}>
        <span>Change Password</span>
        <span className={classes.img}>
          <img src={changePassword} alt="Change Password" />
        </span>
      </button>
      <button
        onClick={() => {
          signoutApi();
          deleteToken();
          navigate("../auth/sign-in");
          dispatch(authActions.signOut())
        }}
      >
        <span>Sign Out</span>
        <span className={classes.img}>
          <img src={signOut} alt="Sign Out" />
        </span>
      </button>
    </div>
  );
};

export default DrawerBody;
