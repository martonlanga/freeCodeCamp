import React from 'react';
import './Display.css';

class Display extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    let val = this.props.value;
    const resultSyle = val.length > 8 ?
      {fontSize: '3em',} :
      {fontSize: '6em',};
    console.log(resultSyle);

    return (
      <div className='Display'>
        <input
          className='Display-result'
          style={resultSyle}
          type='text'
          value={val}
          disabled
        />
      </div>
    );
  }
};

export default Display;
