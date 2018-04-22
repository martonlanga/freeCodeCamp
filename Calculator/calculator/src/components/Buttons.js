import React from 'react';
import Button from './Button';

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
        {this.renderButton(0)}
        {this.renderButton(2)}
        {this.renderButton(3)}
        {this.renderButton(4)}
        {this.renderButton(6)}
      </div>
    );
  }
}

export default Buttons;
