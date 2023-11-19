import React from "react";

import add from "../../../../assets/icons/add-btn.png";
import searchIcon from "../../../../assets/icons/search.png";

import classes from "./SearchBar.module.scss";

import FilterCategory from "./ui/FilterCategory";

type SearchBarProps = {
  onAddSite: () => void;
  search: string;
  onSearch: (value: string) => void;
  categoryFilter: string;
  count: number;
  setCategoryFilter: (category: string) => void;
};

const SearchBar = ({
  onAddSite,
  search,
  onSearch,
  categoryFilter,
  count,
  setCategoryFilter,
}: React.PropsWithChildren<SearchBarProps>): JSX.Element => {
  return (
    <>
      <div className={classes["search-bar"]}>
        <div className={classes.title}>
          <span>Sit</span>es
        </div>

        {search === "" && (
          <div className={classes["mobile-search"]}>
            <FilterCategory
              categoryFilter={categoryFilter}
              count={count}
              setCategoryFilter={setCategoryFilter}
            />
          </div>
        )}

        <div className={classes.actions}>
          <div className={classes.search}>
            <input
              type="text"
              placeholder="Search"
              onChange={(event) => onSearch(event.target.value)}
            />
            <button>
              <img src={searchIcon} alt="Search" />
            </button>
          </div>
          <button className={classes["add-btn"]} onClick={onAddSite}>
            <img src={add} alt="Add" />
          </button>
        </div>
      </div>
      {search === "" && (
        <div className={classes["web-search"]}>
          <FilterCategory
            categoryFilter={categoryFilter}
            count={count}
            setCategoryFilter={setCategoryFilter}
          />
        </div>
      )}
    </>
  );
};

export default SearchBar;
