import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Site from "../../../../models/Site";

import { deleteToken } from "../../../../utils/storage";

import { deletSiteApi } from "../../../../api/sites";

import { AppDispatch } from "../../../../store";
import { authActions } from "../../../../store/auth-slice";
import { sitesActions } from "../../../../store/sites-slice";
import { setUiMessage } from "../../../../store/ui-actions";

import classes from "./SiteModal.module.scss";

import AppBar from "../../../../components/AppBar";
import Button from "../../../../components/ui/Button";
import Loader from "../../../../components/ui/Loader";
import SiteForm from "./SiteForm";

type SiteModalProps = {
  mode: "add" | "view" | "edit";
  site?: Site;
  setMode: (mode: "add" | "view" | "edit" | undefined) => void;
  onCloseDrawer: () => void;
};

const SiteModal = ({
  mode,
  site,
  setMode,
  onCloseDrawer,
}: React.PropsWithChildren<SiteModalProps>): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const deleteHandler = async () => {
    setIsLoading(true);
    const response = await deletSiteApi(site?.id!);
    const decodedResponse = await response.json();
    setIsLoading(false);

    if (decodedResponse["status"] === 200) {
      setMode(undefined);
      dispatch(setUiMessage(decodedResponse["message"], false));
      dispatch(sitesActions.deleteSite(site?.id!));
    } else {
      if (decodedResponse["sessionTimedOut"]) {
        dispatch(setUiMessage("Session Timed Out", true));
        dispatch(authActions.signOut());
        deleteToken();
        navigate("../auth/sign-in");
      } else {
        setError(decodedResponse["message"]);
      }
    }
  };

  return (
    <>
      <AppBar
        onBack={() => {
          onCloseDrawer();
          setMode(undefined);
        }}
      />
      {isLoading && (
        <div className={classes.loader}>
          <Loader />
        </div>
      )}
      <div className={classes["modal-body"]}>
        <div className={classes["title-bar"]}>
          <div className={classes.title}>
            {mode === "add"
              ? "Add Site"
              : mode === "edit"
              ? "Edit Details"
              : "Site Details"}
          </div>
          {mode === "view" && (
            <div className={classes["action-buttons"]}>
              <Button
                label="Delete"
                onClick={deleteHandler}
                disabled={isLoading}
                className={[classes["button"], classes["delete-button"]].join(
                  " "
                )}
              />
              <Button
                label="Edit"
                onClick={() => setMode("edit")}
                disabled={isLoading}
                className={[classes["button"], classes["edit-button"]].join(
                  " "
                )}
              />
            </div>
          )}
        </div>
        <SiteForm
          mode={mode}
          site={site}
          isLoading={isLoading}
          setLoading={(loading) => setIsLoading(loading)}
          onComplete={() => {
            setMode(undefined);
            onCloseDrawer();
          }}
        />
        {error !== "" && <div className={classes.error}>{error}</div>}
      </div>
    </>
  );
};

export default SiteModal;
