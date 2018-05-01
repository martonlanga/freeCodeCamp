import React from 'react';
import Countdown from './Countdown';
import AppBar from 'material-ui/AppBar';
import './Promodoro.css';

class Promodoro extends React.Component {
  constructor() {
    super();

    this.state = {
      workTime: '25',
      breakTime: '5',
    };
  }

  componentDidMount() {

  }

  render() {
    const {workTime, breakTime} = this.state;
    return (
      <div className='promodoro'>
        <AppBar
          title='Promodoro Clock'
          className='appbar'
        />
        <Countdown
          breakTime={breakTime}
          workTime={workTime}
        />
      </div>
    );
  }
}

export default Promodoro;
