import React, { useEffect, useState } from "react";
import * as BottlesApi from "../../API/Bottles";
import { Bottle, BOTTLE_STATE } from "../../bottles/store/types";
import { IProps } from "../../utils";
import classes from "./SelectBottles.module.scss";
import BottleView from "../../UI/BottleView/BottleView";
import Button from "../../UI/Button/Button";

interface Props extends IProps {
  selectedIds: string[];
  save: (ids: string[]) => void;
}

const SelectBottles = (props: Props) => {
  const [bottles, setBottles] = useState<Bottle[]>([]);
  const [selectedIds, setSelectedIds] = useState(props.selectedIds);

  useEffect(() => {
    const promises = [
      BottlesApi.getBottlesByIds(
        props.inventoryId!,
        props.token!,
        props.selectedIds
      ),
      BottlesApi.getBottles(
        props.inventoryId!,
        props.token!,
        BOTTLE_STATE.UNLISTED
      ),
    ];
    Promise.all(promises).then((res) => setBottles([...res[0], ...res[1]]));
  }, [props.inventoryId, props.selectedIds, props.token]);

  return (
    <div className={classes.SelectBottles}>
      <div className={classes.List}>
        {bottles.map((btl) => (
          <div
            key={btl.id}
            className={
              selectedIds.indexOf(btl.id!, 0) >= 0 ? classes.Selected : ""
            }
            onClick={() => {
              const index = selectedIds.indexOf(btl.id!, 0);
              if (index >= 0) {
                setSelectedIds(selectedIds.filter((id) => id !== btl.id!));
              } else {
                setSelectedIds(selectedIds.concat(btl.id!));
              }
            }}
          >
            <BottleView bottle={btl} />
          </div>
        ))}
      </div>
      <Button
        fillWidth
        type="cta"
        value="SAVE"
        onClick={() => {
          props.save(selectedIds);
        }}
      />
    </div>
  );
};

export default SelectBottles;
