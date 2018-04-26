import React from 'react';
import './Display.css';

class Display extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className='Display'>
        <input
          className='Display-result'
          type='text'
          value={this.props.value}
        />
      </div>
    );
  }
};

export default Display;
