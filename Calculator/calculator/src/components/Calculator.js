import React from 'react';
import './Calculator.css';
import Display from './Display';
import Buttons from './Buttons';

class Calculator extends React.Component {

  constructor() {
    super();

    this.state = ({
      value: '',
    });
  }

  handleClick(value) {
    console.log(value);
    const oldValue = this.state.value;
    this.setState({
      value: oldValue + value,
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className='Calculator'>
        <div className='display-grid'>
          <Display value={this.state.value}></Display>
        </div>
        <div className='buttons-grid'>
          <Buttons onClick={(value) => this.handleClick(value)}></Buttons>
        </div>
      </div>
    );
  }
}

export default Calculator;
