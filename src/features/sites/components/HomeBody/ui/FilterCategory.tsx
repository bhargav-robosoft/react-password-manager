import React from "react";

import { siteTypes } from "../../../../../constants";

import classes from "./FilterCategory.module.scss";

type FilterCategoryProps = {
  categoryFilter: string;
  count: number;
  setCategoryFilter: (category: string) => void;
};

const FilterCategory = ({
  categoryFilter,
  count,
  setCategoryFilter,
}: React.PropsWithChildren<FilterCategoryProps>): JSX.Element => {
  return (
    <div className={classes.filter}>
      <div className={classes.count}>{count}</div>
      <div className={classes["category-filter"]}>{categoryFilter}</div>
      <select
        value={categoryFilter}
        onChange={(event) => setCategoryFilter(event.target.value)}
        size={1}
      >
        <option value="All">All</option>
        {siteTypes.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterCategory;
