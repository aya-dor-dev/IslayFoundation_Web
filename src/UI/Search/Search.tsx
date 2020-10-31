import React from "react";
import classes from "./Search.module.scss";

const Search = (props: {
  onFilterChange: (value: string) => void;
  placeHolder?: string;
}) => {
  return (
    <div className={classes.Search}>
      <input type="text" placeholder="Search" onChange={(event) => props.onFilterChange(event.target.value)} />
    </div>
  );
};

export default Search;
