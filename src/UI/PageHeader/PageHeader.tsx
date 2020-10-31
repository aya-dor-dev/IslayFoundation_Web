import React from "react";
import classes from "./PageHeader.module.scss";
import BarLoader from "react-spinners/BarLoader";
import Search from "../Search/Search";

type PageHeaderProps = {
  loading?: boolean;
  onFilterChange?: (value: string) => void;
};

const PageHeader = (props: React.PropsWithChildren<PageHeaderProps>) => {
  const filter = props.onFilterChange ? <Search onFilterChange={props.onFilterChange}/> : null
  return (
    <React.Fragment>
      <div className={classes.Div}>
        <h1 className={classes.Title}>{props.children}</h1>
        {filter}
      </div>
      {props.loading ? (
        <BarLoader width="100%" height="1px" color="#dba514" />
      ) : (
        <div style={{ height: "1px", backgroundColor: "#ccc" }}></div>
      )}
    </React.Fragment>
  );
};

export default PageHeader;
