import React from 'react';
import './Calculator.css';
import Display from './Display';
import Buttons from './Buttons';

class Calculator extends React.Component {

  constructor() {
    super();

    this.state = ({
      number: '',
      oldNumber: '',
      display: '',
      operator: null,
    });
  }

  handleClick(value) {
    const {oldNumber, number, operator} = this.state;
    const setNumber = (number) =>
              this.setState({
                number,
              });
    const setDisplay = (display) =>
              this.setState({
                display,
              });
    const setOldNumber = (oldNumber) =>
              this.setState({
                oldNumber
              });
    const setOperator = (operator) =>
              this.setState({
                operator,
              });

    if (Number(value) || value === 0 || value === '.') {
      if (value === '.' && number.indexOf('.') !== -1) {
        return;
      }
      const display = number + value;
      setNumber(display);
      setDisplay(display);
    } else {
      switch (value) {
        case 'DEL':
          setNumber('');
          setDisplay('');
          setOldNumber('');
          setOperator(null);
          break;
        case '=':
          if (oldNumber && number) {
            const result = calculate(oldNumber, number, operator);
            setDisplay(result);
            setOldNumber(result);
            setOperator(null);
            setNumber('');
          }
          break;
        default:
          if (!operator) {
            setOperator(value);
            setNumber('');
          }
          if (number) {
            setOldNumber(number);
          }
          break;
      }
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className='Calculator'>
        <div className='display-grid'>
          <Display value={this.state.display}></Display>
        </div>
        <div className='buttons-grid'>
          <Buttons onClick={(value) => this.handleClick(value)}></Buttons>
        </div>
      </div>
    );
  }
}

const calculate = (oldNumber, number, operator) => {
  oldNumber = Number(oldNumber);
  number = Number(number);
  switch (operator) {
    case '/':
      return oldNumber / number + '';
    case 'x':
      return oldNumber * number + '';
    case '+':
      return oldNumber + number + '';
    case '-':
      return oldNumber - number + '';
    default:
      console.log('Error');
      return;
  }
};

export default Calculator;
