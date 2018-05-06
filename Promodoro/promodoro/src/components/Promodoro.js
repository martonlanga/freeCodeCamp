import React from 'react';
import Countdown from './Countdown';
import CustomAppBar from './CustomAppBar';
import './Promodoro.css';

class Promodoro extends React.Component {
  constructor() {
    super();

    this.state = {
      workTime: '1',
      breakTime: '5',
    };

    this.changeTime = this.changeTime.bind(this);
  }

  componentDidMount() {

  }

  changeTime(asd) {
    console.log(asd);
  }

  render() {
    const {workTime, breakTime} = this.state;
    const {changeTime} = this;
    return (
      <div className='promodoro'>
        <CustomAppBar onChangeTime={changeTime} />
        <Countdown
          breakTime={breakTime}
          workTime={workTime}
        />
      </div>
    );
  }
}

export default Promodoro;
