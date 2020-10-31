import React, { useState } from "react";
import classes from "./Table.module.scss";

export interface TableColumn<T> {
  title: string;
  sort?: (asc: boolean) => void;
  width?: string;
  className?: string;
  render: (item: T) => any;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  items: T[];
  onRowSelected?: (index: number, item: T) => void;
}

const Table = function <T>(props: TableProps<T>) {
  const [sortAsc, setSortAsc] = useState(true);
  const [sortedColumnKey, setSortedColumnKey] = useState<number | undefined>(
    undefined
  );

  const defineColumns = (columns: TableColumn<T>[]) =>
    columns.map((column) => <col style={{ width: column.width }} />);

  const headers = (columns: TableColumn<T>[]) => (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th
            className={column.sort ? classes.Sortable : undefined}
            onClick={() => {
              if (column.sort) {
                let dir = sortAsc
                if (sortedColumnKey === index) {
                  dir = !dir
                }

                column.sort(dir)
                setSortAsc(dir)
                setSortedColumnKey(index)
              }
            }}
          >
            {column.title}
          </th>
        ))}
      </tr>
    </thead>
  );

  return (
    <table className={classes.Table}>
      {defineColumns(props.columns)}
      {headers(props.columns)}
      {props.items.map((item, index) => {
        const rowStyle = [classes.Row];
        if (props.onRowSelected) {
          rowStyle.push(classes.SelectableRow);
        }
        return (
          <tr
            className={rowStyle.join(" ")}
            onClick={
              props.onRowSelected
                ? () => props.onRowSelected!(index, item)
                : undefined
            }
          >
            {props.columns.map((column) => (
              <td>{column.render(item)}</td>
            ))}
          </tr>
        );
      })}
    </table>
  );
};

export default Table;
