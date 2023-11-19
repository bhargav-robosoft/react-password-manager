import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { siteTypes } from "../../../../constants";

import Site, { toSite } from "../../../../models/Site";

import { deleteToken } from "../../../../utils/storage";
import {
  siteCategoryValidator,
  siteNameValidator,
  sitePasswordValidator,
  urlValidator,
  usernameValidator,
} from "../../../../utils/validators";

import { addSiteApi, editSiteApi } from "../../../../api/sites";

import { AppDispatch } from "../../../../store";
import { authActions } from "../../../../store/auth-slice";
import { sitesActions } from "../../../../store/sites-slice";
import { setUiMessage } from "../../../../store/ui-actions";

import classes from "./SiteForm.module.scss";

import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import SelectInput from "./ui/SelectInput";
import PasswordInput from "./ui/PasswordInput";

type SiteFormProps = {
  mode: "add" | "view" | "edit";
  site?: Site;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  onComplete: () => void;
};

const SiteForm = ({
  mode,
  site,
  isLoading,
  setLoading,
  onComplete,
}: React.PropsWithChildren<SiteFormProps>): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [url, setUrl] = useState<string>("");
  const [urlTouched, setUrlTouched] = useState<boolean>(false);

  const [siteName, setSiteName] = useState<string>("");
  const [siteNameTouched, setSiteNameTouched] = useState<boolean>(false);

  const [siteCategory, setSiteCategory] = useState<string>("");
  const [siteCategoryTouched, setSiteCategoryTouched] =
    useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [usernameTouched, setUsernameTouched] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false);

  const [notes, setNotes] = useState<string>("");
  const [notesTouched, setNotesTouched] = useState<boolean>(false);

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (mode === "view" || mode === "edit") {
      setUrl(site!.url);
      setSiteName(site!.name);
      setSiteCategory(site!.category);
      setUsername(site!.username);
      setPassword(site!.password);
      setNotes(site!.notes);
    }
  }, [
    mode,
    site,
    setUrl,
    setSiteName,
    setSiteCategory,
    setUsername,
    setPassword,
    setNotes,
  ]);

  const urlHandler = (value: string) => {
    if (!urlTouched) {
      setUrlTouched(true);
    }

    setUrl(value);
  };

  const siteNameHandler = (value: string) => {
    if (!siteNameTouched) {
      setSiteNameTouched(true);
    }

    setSiteName(value);
  };

  const siteCategoryHandler = (value: string) => {
    if (!siteCategoryTouched) {
      setSiteCategoryTouched(true);
    }

    setSiteCategory(value);
  };

  const usernameHandler = (value: string) => {
    if (!usernameTouched) {
      setUsernameTouched(true);
    }

    setUsername(value);
  };

  const passwordHandler = (value: string) => {
    if (!passwordTouched) {
      setPasswordTouched(true);
    }

    setPassword(value);
  };

  const notesHandler = (value: string) => {
    if (!notesTouched) {
      setNotesTouched(true);
    }

    setNotes(value);
  };

  const submitHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (mode === "add") {
      setUrlTouched(true);
      setSiteNameTouched(true);
      setSiteCategoryTouched(true);
      setUsernameTouched(true);
      setPasswordTouched(true);
      setNotesTouched(true);
    }
    setFormSubmitted(true);

    const formValid =
      urlValidator(url) === null &&
      siteNameValidator(siteName) === null &&
      siteCategoryValidator(siteCategory) === null &&
      usernameValidator(username) === null &&
      sitePasswordValidator(password) === null;

    if (formValid) {
      siteHandler();
    }
  };

  const resetHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setUrlTouched(false);
    setUrl("");
    setSiteNameTouched(false);
    setSiteName("");
    setSiteCategoryTouched(false);
    setSiteCategory("");
    setUsernameTouched(false);
    setUsername("");
    setPasswordTouched(false);
    setPassword("");
    setNotesTouched(false);
    setNotes("");
    setFormSubmitted(false);
  };

  const siteHandler = async () => {
    const newSite: Site = {
      url: url,
      name: siteName,
      category: siteCategory,
      username: username,
      password: password,
      notes: notes,
    };

    setLoading(true);
    var response;
    var decodedResponse;

    if (mode === "add") {
      response = await addSiteApi(newSite);
      decodedResponse = await response.json();
    } else {
      response = await editSiteApi(site!, {
        url: urlTouched ? url : undefined,
        name: siteNameTouched ? siteName : undefined,
        category: siteCategoryTouched ? siteCategory : undefined,
        username: usernameTouched ? username : undefined,
        password: passwordTouched ? password : undefined,
        notes: notesTouched ? notes : undefined,
      });
      decodedResponse = await response.json();
    }
    setLoading(false);

    if (decodedResponse["status"] === 200) {
      onComplete();
      dispatch(setUiMessage(decodedResponse["message"], false));
      if (mode === "add") {
        dispatch(sitesActions.addSite(toSite(decodedResponse["site"])));
      } else {
        dispatch(sitesActions.editSite(toSite(decodedResponse["site"])));
      }
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
    <form className={classes.form}>
      <div className={classes["form-group"]}>
        <Input
          id="url"
          label="URL"
          type="url"
          value={url}
          touched={urlTouched}
          placeholder="Enter Site URL"
          formSubmitted={formSubmitted}
          disabled={mode === "view"}
          onInput={urlHandler}
          validator={urlValidator}
          formGroupClass={classes["form-control"]}
          invalidClass={classes.invalid}
          invalidInputClass={classes["input-error"]}
        />
      </div>
      <div className={classes["form-group"]}>
        <Input
          id="sitename"
          label="Site Name"
          showlabel={true}
          type="text"
          value={siteName}
          touched={siteNameTouched}
          placeholder="Enter Site Name"
          formSubmitted={formSubmitted}
          disabled={mode === "view"}
          onInput={siteNameHandler}
          validator={siteNameValidator}
          formGroupClass={classes["form-control"]}
          invalidClass={classes.invalid}
          invalidInputClass={classes["input-error"]}
        />
        <SelectInput
          id="siteCategory"
          label="Site Category"
          options={siteTypes}
          value={siteCategory}
          touched={siteCategoryTouched}
          formSubmitted={formSubmitted}
          disabled={mode === "view"}
          onInput={siteCategoryHandler}
          validator={siteCategoryValidator}
          defaultClass={classes.default}
          formGroupClass={classes["form-control"]}
          invalidClass={classes.invalid}
          invalidInputClass={classes["input-error"]}
        />
      </div>
      <div className={classes["form-group"]}>
        <Input
          id="username"
          label="Username"
          showlabel={true}
          type="username"
          value={username}
          touched={usernameTouched}
          placeholder="Enter Site Username"
          formSubmitted={formSubmitted}
          disabled={mode === "view"}
          onInput={usernameHandler}
          validator={usernameValidator}
          formGroupClass={classes["form-control"]}
          invalidClass={classes.invalid}
          invalidInputClass={classes["input-error"]}
        />
        <PasswordInput
          id="password"
          label="Password"
          value={password}
          touched={passwordTouched}
          placeholder="Enter Site Password"
          formSubmitted={formSubmitted}
          disabled={mode === "view"}
          onInput={passwordHandler}
          validator={sitePasswordValidator}
          invalidInputClass={classes["input-error"]}
        />
      </div>
      <div className={classes["form-group"]}>
        <Input
          id="notes"
          label="Notes"
          showlabel={true}
          type="text"
          value={notes}
          touched={notesTouched}
          placeholder="Add Notes"
          formSubmitted={formSubmitted}
          disabled={mode === "view"}
          onInput={notesHandler}
          validator={(value) => {
            return null;
          }}
          formGroupClass={classes["form-control"]}
          invalidClass={classes.invalid}
          invalidInputClass={classes["input-error"]}
        />
      </div>
      {error !== "" && <div className={classes["input-error"]}>{error}</div>}
      {mode !== "view" && (
        <div className={classes["action-buttons"]}>
          {mode === "add" && (
            <Button
              label="Reset"
              className={classes.reset}
              disabled={isLoading}
              onClick={resetHandler}
            />
          )}
          {(mode === "add" || mode === "edit") && (
            <Button
              label={mode === "add" ? "Save" : "Update"}
              className={classes.submit}
              disabled={isLoading}
              onClick={submitHandler}
            />
          )}
        </div>
      )}
    </form>
  );
};

export default SiteForm;
