import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { toSites } from "../../../models/Site";

import { deleteToken } from "../../../utils/storage";

import { getSitesApi } from "../../../api/sites";

import { AppDispatch } from "../../../store";
import { authActions } from "../../../store/auth-slice";
import { sitesActions } from "../../../store/sites-slice";
import { setUiMessage } from "../../../store/ui-actions";

import loading from "../../../assets/icons/loading.gif";

import classes from "./Home.module.scss";

import Modal from "../../../components/ui/Modal";
import Header from "../components/Header";
import HomeBody from "../components/HomeBody/HomeBody";
import ChangePasswordModal from "../../authentication/components/ChangePasswordModal";
import Toast from "../../../components/ui/Toast";
import Drawer from "../../../components/ui/Drawer";
import DrawerBody from "../components/DrawerBody";
import SearchModal from "../components/SearchModal";

const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [showChangePasswordModal, setShowChangePasswordModal] =
    useState<boolean>(false);

  const [mode, setMode] = useState<"add" | "view" | "edit">();

  useEffect(() => {
    const getSites = async () => {
      setIsLoading(true);
      const response = await getSitesApi();
      const decodedResponse = await response.json();
      setIsLoading(false);

      if (decodedResponse["status"] === 200) {
        dispatch(authActions.signIn());
        dispatch(setUiMessage(decodedResponse["message"], false));
        const sites = toSites(decodedResponse["sites"]);
        dispatch(sitesActions.getSites(sites));
      } else {
        if (decodedResponse["sessionTimedOut"]) {
          dispatch(setUiMessage("Session Timed Out", true));
          dispatch(authActions.signOut());
          deleteToken();
          navigate("../auth/sign-in");
        } else {
          if (decodedResponse["status"] === 401) {
            navigate("../auth/sign-in");
          }
          dispatch(setUiMessage(decodedResponse["message"], true));
        }
      }
    };

    getSites();
  }, [navigate, dispatch]);

  return (
    <div className={classes["home-page"]}>
      {!isLoading && (
        <>
          <Header
            onOpenDrawer={() => setShowDrawer(true)}
            onChangePassword={() => setShowChangePasswordModal(true)}
          />
          {showDrawer && (
            <Drawer onClose={() => setShowDrawer(false)}>
              <DrawerBody
                onSearch={() => {
                  setShowDrawer(false);
                  setShowSearchModal(true);
                }}
                onAddSite={() => {
                  setShowDrawer(false);
                  setMode("add");
                }}
                onPasswordChange={() => {
                  setShowDrawer(false);
                  setShowChangePasswordModal(true);
                }}
              />
            </Drawer>
          )}
          {showSearchModal && (
            <Modal
              onClose={() => setShowSearchModal(false)}
              children={
                <SearchModal
                  mode={mode}
                  setMode={setMode}
                  onClose={() => setShowSearchModal(false)}
                />
              }
            />
          )}
          {showChangePasswordModal && (
            <Modal
              onClose={() => setShowChangePasswordModal(false)}
              children={
                <ChangePasswordModal
                  onClose={() => setShowChangePasswordModal(false)}
                />
              }
            />
          )}
          {!showSearchModal && (
            <HomeBody
              mode={mode}
              onSetMode={setMode}
              onCloseDrawer={() => setShowDrawer(false)}
              fromSearchModal={false}
            />
          )}
        </>
      )}
      {isLoading && (
        <div className={classes["loading"]}>
          <img src={loading} alt="Loading" />
        </div>
      )}
      <Toast uiClass={classes["ui-message"]} />
    </div>
  );
};

export default Home;
