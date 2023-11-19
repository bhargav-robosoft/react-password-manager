import React, { useState } from "react";
import { useSelector } from "react-redux";

import Site from "../../../../models/Site";

import { RootState } from "../../../../store";

import classes from "./HomeBody.module.scss";

import Modal from "../../../../components/ui/Modal";
import SearchBar from "./SearchBar";
import SiteModal from "./SiteModal";
import SiteGrid from "./SiteGrid";

type HomeBodyProps = {
  mode: "add" | "view" | "edit" | undefined;
  onSetMode: (mode: "add" | "view" | "edit" | undefined) => void;
  onCloseDrawer: () => void;
  fromSearchModal: boolean;
  searchModalSearch?: string;
};

const HomeBody = ({
  mode,
  onSetMode,
  onCloseDrawer,
  fromSearchModal,
  searchModalSearch = "",
}: React.PropsWithChildren<HomeBodyProps>): JSX.Element => {
  const sites = useSelector((state: RootState) => state.sites.sites);

  const [search, setSearch] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [site, setSite] = useState<Site>();

  const viewHandler = (site: Site) => {
    onSetMode("view");
    setSite(site);
  };

  var filteredSites: Site[] = [];
  if (fromSearchModal) {
    if (searchModalSearch === "") {
      filteredSites = sites;
    } else {
      filteredSites = sites.filter((site) =>
        site.name.toLowerCase().startsWith(searchModalSearch.toLowerCase())
      );
    }
  } else {
    if (search !== "") {
      filteredSites = sites.filter((site) =>
        site.name.toLowerCase().startsWith(search.toLowerCase())
      );
    } else {
      if (categoryFilter === "All") {
        filteredSites = sites;
      } else {
        filteredSites = sites.filter(
          (site) => site.category === categoryFilter
        );
      }
    }
  }

  return (
    <div className={classes["home-body"]}>
      {!fromSearchModal && (
        <SearchBar
          onAddSite={() => onSetMode("add")}
          search={search}
          onSearch={setSearch}
          categoryFilter={categoryFilter}
          count={filteredSites.length}
          setCategoryFilter={setCategoryFilter}
        />
      )}
      {mode && (
        <Modal
          onClose={() => onSetMode(undefined)}
          children={
            <SiteModal
              mode={mode}
              setMode={onSetMode}
              site={site}
              onCloseDrawer={onCloseDrawer}
            />
          }
        />
      )}
      {(!fromSearchModal ||
        (fromSearchModal && filteredSites.length !== 0)) && (
        <SiteGrid sites={filteredSites} onView={viewHandler} />
      )}
    </div>
  );
};

export default HomeBody;
