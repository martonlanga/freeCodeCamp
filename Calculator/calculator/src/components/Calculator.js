import React from 'react';
import './Calculator.css';
import Display from './Display';
import Buttons from './Buttons';

class Calculator extends React.Component {

  constructor() {
    super();

    this.state = ({
      value: String.fromCharCode(160),
    });
  }

  handleClick(value) {
    const oldValue = this.state.value;
    const setValue = (value) =>
              this.setState({
                value: value,
              });

    if (Number(value) || value === 0) {
      setValue(oldValue + value);
    } else {
      switch (value) {
        case 'DEL':
          setValue(String.fromCharCode(160));
          break;
        default:
          console.log(value);
      }
    }
  }

  render() {
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
