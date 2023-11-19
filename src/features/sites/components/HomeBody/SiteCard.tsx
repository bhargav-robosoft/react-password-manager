import React from "react";
import { useDispatch } from "react-redux";

import Site from "../../../../models/Site";

import { AppDispatch } from "../../../../store";
import { setUiMessage } from "../../../../store/ui-actions";

import copy from "../../../../assets/icons/copy.png";
import passwordManager from "../../../../assets/logo-small.svg";

import classes from "./SiteCard.module.scss";

type SiteCardProps = {
  site: Site;
  onClick: (site: Site) => void;
};

const SiteCard = ({
  site,
  onClick,
}: React.PropsWithChildren<SiteCardProps>): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const copyHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    dispatch(setUiMessage("Password copied to clipboard", false));
    navigator.clipboard.writeText(site.password);
  };

  return (
    <div className={classes["site-card"]} onClick={() => onClick(site)}>
      <div className={classes["top-section"]}>
        <img src={site.imageUrl === "" ? passwordManager: site.imageUrl} alt={site.name + " Logo"} />
        <div>
          <div className={classes.sitename}>{site.name}</div>
          <button onClick={copyHandler}>
            <img src={copy} alt="Copy" />
            <span>Copy Password</span>
          </button>
        </div>
      </div>
      <div className={classes["bottom-section"]}>{site.url}</div>
    </div>
  );
};

export default SiteCard;
