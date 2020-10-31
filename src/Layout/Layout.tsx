import React, { useEffect } from "react";
import {
  Redirect,
  Route,
  Switch,
  NavLink,
  withRouter,
  useRouteMatch,
  RouteComponentProps,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Layout.module.scss";
import Menu from "./menu/Menu";
import BottlesList from "../bottles/BottlesList";
import Investors from "../investors/Investors";
import AuctionsRoot from "../auctions/AuctionsRoot";
import Logo from "../UI/Logo/Logo";
import Toolbar from "./Toolbar/Toolbar";
import { loadInventory } from "../inventories/store/actions";
import Backdrop from '../UI/Backdrop/Backdrop';
import { RootState } from "../store/rootReducer";

type LayoutRouteProps = {
  inventoryId: string
}

const Layout = () => {
  let token = useSelector((state: RootState) => state.session.token);
  const dispatch = useDispatch();
  const BottlesScreen = (props: RouteComponentProps<LayoutRouteProps>) => {
    return <BottlesList inventoryId={props.match.params.inventoryId} />;
  };
  const InvestorsScreen = (props: RouteComponentProps<LayoutRouteProps>) => {
    return <Investors investors={[]} />;
    // return <Investors inventoryId={props.match.params.inventoryId} />;
  };
  const AuctionsScreen = (props: RouteComponentProps<LayoutRouteProps>) => {
    return <AuctionsRoot inventoryId={props.match.params.inventoryId} token={token}/>;
  };

  
  let inventoryModel = useSelector((state: RootState) => state.inventory);
  let inventoryId = useRouteMatch<LayoutRouteProps>("/inventory/:inventoryId")!.params.inventoryId;

  useEffect(() => {
    if (token && inventoryId) {
      dispatch(loadInventory(token, inventoryId));
    }
  }, [inventoryId, token, dispatch]);

  let loadingIndicator = null;
  if (inventoryModel.loading) {
    loadingIndicator = <Backdrop show />
  }

  return (
    <React.Fragment>
      {loadingIndicator}
      <div className={styles.Layout}>
        <div className={styles.Logo}>
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>
        <Route
          path="/inventory/:inventoryId"
          render={(props) => (
            <div className={styles.Toolbar}>
              <Toolbar {...props} />
            </div>
          )}
        />
        <div className={styles.Menu}>
          <Route
            path="/inventory/:inventoryId"
            render={(props) => (
              <div className={styles.Toolbar}>
                <Menu {...props} />
              </div>
            )}
          />
        </div>
        <div className={styles.Content}>
          <Switch>
            <Route
              path="/inventory/:inventoryId/overview"
              render={() => <p>overview</p>}
            />
            <Route
              path="/inventory/:inventoryId/auctions"
              component={AuctionsScreen}
            />
            <Route
              path="/inventory/:inventoryId/bottles"
              component={BottlesScreen}
            />
            <Route
              path="/inventory/:inventoryId/investors"
              component={InvestorsScreen}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Layout);
