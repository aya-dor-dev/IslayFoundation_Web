import React from 'react';
import classes from './Card.module.scss';

const Card = (props: any) => {
  return (
    <div className={classes.Card}>
      {props.children}
    </div>
  );
};

export default Card;