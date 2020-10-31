import React from "react";
import {useSelector} from "react-redux"
import InventoriesList from "../inventories/InventoriesList";

const Home = () => {
  // return (
  //   <div>
  //     <div className={classes.Header}>
  //       <Logo/>
  //       {/* <h5 className={classes.Title}>Inventories</h5> */}
  //     </div>
  //   </div>
  // );

  const inventories = useSelector((state) => state.session.inventories);
  return <InventoriesList inventories={inventories}/>;
};

export default Home;
