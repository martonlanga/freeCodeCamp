import React from 'react';
import Button from './Button';
import './Buttons.css';

class Buttons extends React.Component {

  renderButton(value) {
    return (
      <Button
        value={value}
        onClick={() => this.props.onClick(value)}
      />
    );
  }

  render() {
    return (
      <div className='Buttons'>
        <div className='grid-1'>
          {this.renderButton(7)}
          {this.renderButton(8)}
          {this.renderButton(9)}
          {this.renderButton(4)}
          {this.renderButton(5)}
          {this.renderButton(6)}
          {this.renderButton(1)}
          {this.renderButton(2)}
          {this.renderButton(3)}
          {this.renderButton('.')}
          {this.renderButton(0)}
          {this.renderButton('=')}
        </div>
        <div className='grid-2'>
          {this.renderButton('DEL')}
          {this.renderButton('/')}
          {this.renderButton('x')}
          {this.renderButton('+')}
          {this.renderButton('-')}
        </div>
      </div>
    );
  }
}

export default Buttons;
