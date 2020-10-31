import React from "react";
import SharedClasses from "../../sharedStyles.module.scss";
import InfoCard from "../InfoCard/InfoCard";

export type InfoItem = {
  id: string;
  name: string;
  value: any;
  selected?: boolean;
  onClick?: () => void;
  cta?: boolean;
  positive?: boolean;
};

const InfoView = (props: { items: InfoItem[] }) => {
  return (
    <div className={SharedClasses.Info}>
      {props.items.map((item) => (
        <InfoCard
          key={item.name}
          name={item.name}
          cta={item.cta}
          onClick={item.onClick}
          selected={item.selected}
          positive={item.positive}
        >
          {item.value}
        </InfoCard>
      ))}
    </div>
  );
};

export default InfoView;
