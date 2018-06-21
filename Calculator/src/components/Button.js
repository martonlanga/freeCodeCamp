import React from 'react';
import './Button.css';

const Button = (props) => {
  const {classes} = props;
  return (
    <div className={classes} onClick={props.onClick}>
      {props.value}
    </div>
  );
};

export default Button;
