import React from 'react';
import Button from './Button';
import './Buttons.css';

class Buttons extends React.Component {

  renderButton(value, color) {
    const classes = color + ' Button';
    return (
      <Button
        value={value}
        onClick={() => this.props.onClick(value)}
        classes={classes}
      />
    );
  }

  render() {
    return (
      <div className='Buttons'>
        <div className='grid-1'>
          {this.renderButton(7, 'darkGrey')}
          {this.renderButton(8, 'darkGrey')}
          {this.renderButton(9, 'darkGrey')}
          {this.renderButton(4, 'darkGrey')}
          {this.renderButton(5, 'darkGrey')}
          {this.renderButton(6, 'darkGrey')}
          {this.renderButton(1, 'darkGrey')}
          {this.renderButton(2, 'darkGrey')}
          {this.renderButton(3, 'darkGrey')}
          {this.renderButton('.', 'darkGrey')}
          {this.renderButton(0, 'darkGrey')}
          {this.renderButton('=', 'darkGrey')}
        </div>
        <div className='grid-2'>
          {this.renderButton('DEL', 'lightGrey')}
          {this.renderButton('/', 'lightGrey')}
          {this.renderButton('x', 'lightGrey')}
          {this.renderButton('+', 'lightGrey')}
          {this.renderButton('-', 'lightGrey')}
        </div>
      </div>
    );
  }
}

export default Buttons;
