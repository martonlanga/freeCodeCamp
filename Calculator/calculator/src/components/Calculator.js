import React from 'react';
import './Calculator.css';
import Display from './Display';
import Buttons from './Buttons';

class Calculator extends React.Component {

  handleClick(value) {
    console.log(value);
  }

  render() {
    return (
      <div className='Calculator'>
        <div className='display-grid'>
          <Display></Display>
        </div>
        <div className='buttons-grid'>
          <Buttons onClick={(value) => this.handleClick(value)}></Buttons>
        </div>
      </div>
    );
  }
}

export default Calculator;
