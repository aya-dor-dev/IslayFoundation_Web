import React from 'react';
import classes from './Logo.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel, faWineBottle } from '@fortawesome/free-solid-svg-icons'

const Logo = (props) => {
  const label = props.onlyLogo ? null : <h1 className={classes.Label}>My Whisky Inventory</h1>
  return (
    <div className={classes.Container}>
      <div className={classes.Logo}>
        <FontAwesomeIcon className={classes.Hammer} icon={faGavel}/>
        <FontAwesomeIcon className={classes.Bottle} icon={faWineBottle}/>
      </div>
      {label}
    </div>
  );
};

export default Logo;