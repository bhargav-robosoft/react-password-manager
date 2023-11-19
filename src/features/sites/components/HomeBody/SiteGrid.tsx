import React from "react";

import Site from "../../../../models/Site";

import classes from "./SiteGrid.module.scss";

import SiteCard from "./SiteCard";

type SiteGridProps = {
  sites: Site[];
  onView: (site: Site) => void;
};

const SiteGrid = ({
  sites,
  onView,
}: React.PropsWithChildren<SiteGridProps>): JSX.Element => {
  if (sites.length > 0) {
    return (
      <div className={classes["site-grid"]}>
        {sites.map((site) => (
          <SiteCard key={site.id} site={site} onClick={onView} />
        ))}
      </div>
    );
  } else {
    return (
      <div className={classes["empty-grid"]}>
        <div className={classes.empty}>
          Please Click on the “+” symbol to add sites
        </div>
      </div>
    );
  }
};

export default SiteGrid;
