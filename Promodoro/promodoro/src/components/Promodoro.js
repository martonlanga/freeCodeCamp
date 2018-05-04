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
  }

  componentDidMount() {

  }

  onClickSettings(asd) {
    console.log(asd);
  }

  render() {
    const {workTime, breakTime} = this.state;
    return (
      <div className='promodoro'>
        <CustomAppBar onClickEvent={() => this.onClickSettings()} />
        <Countdown
          breakTime={breakTime}
          workTime={workTime}
        />
      </div>
    );
  }
}

export default Promodoro;
