import React, { useState } from "react";

import searchIcon from "../../../assets/icons/search.png";

import classes from "./SearchModal.module.scss";

import AppBar from "../../../components/AppBar";
import HomeBody from "./HomeBody/HomeBody";

type AppBarProps = {
  mode: "add" | "view" | "edit" | undefined;
  setMode: (mode: "add" | "view" | "edit" | undefined) => void;
  onClose: () => void;
};

const SearchModal = ({
  mode,
  setMode,
  onClose,
}: React.PropsWithChildren<AppBarProps>): JSX.Element => {
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <AppBar onBack={onClose} />
      <div className={classes["modal-body"]}>
        <div className={classes.search}>
          <input
            type="text"
            placeholder="Search"
            onChange={(event) => setSearch(event.target.value)}
          />
          <div>
            <img src={searchIcon} alt="Search" />
          </div>
        </div>
        {search !== "" && (
          <div className={classes["home-body"]}>
            <HomeBody
              mode={mode}
              onSetMode={setMode}
              onCloseDrawer={onClose}
              fromSearchModal={true}
              searchModalSearch={search}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SearchModal;
