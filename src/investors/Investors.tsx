import React from "react";
import PageHeader from "../UI/PageHeader/PageHeader";
import SharedClasses from "../sharedStyles.module.scss";
import InvestorListItem from "./investor/investor";
import { Investor } from "./store/types";

const Investors = (props: { investors: Investor[] }) => {
  const list = investors.map((investor) => <InvestorListItem key={Math.random()} {...investor} />);
  return (
    <div className={SharedClasses.Page}>
      <PageHeader loading>Investors</PageHeader>
      <div className={SharedClasses.PageContent}>{list}</div>
    </div>
  );
};

const investor = {
  id: "asdf",
  name: "Dor",
  email: "ayalon.dor@gmail.com",
  bottlesOwned: 12,
  invested: 1000,
  withdrawen: 1000,
  profilePictureUrl: undefined,
};

const investors = [investor, investor, investor];
export default Investors;
