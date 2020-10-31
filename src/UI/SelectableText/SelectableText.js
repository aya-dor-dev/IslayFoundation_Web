import React from 'react';
import classes from './SelectableText.module.scss'

const SelectableText = (props) => {
  const style = [classes.SelectableText];
  if (props.selected) {
    style.push(classes.Selected);
  }

  if (props.disabled) {
    style.push(classes.Disabled);
  }

  return (
    <div className={style.join(' ')} onClick={props.clicked}>
      {props.value}
    </div>
  );
};

export default SelectableText;