import React from 'react';
import './Display.css';

class Display extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className='Display'>
        <div className='display-result'>{this.props.value}</div>
      </div>
    );
  }
};

export default Display;
