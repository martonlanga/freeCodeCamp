import React from 'react';
import './Countdown.css';

class Countdown extends React.Component {
  constructor(props) {
    super();

    let {workTime, breakTime} = props;
    const isWorking = true;
    const remainingSeconds = this.timeToSeconds(workTime);
    const formattedTime = this.formattedTime(remainingSeconds);

    this.state = {
      remainingSeconds,
      formattedTime,
      isWorking,
      workTime,
      breakTime,
    };

    this.startCountdown = this.startCountdown.bind(this);
    this.countdown = this.countdown.bind(this);
  }

  startCountdown() {
    this.timerId = setInterval(this.countdown, 1000);
  }

  formattedTime(seconds) {
    let m = Math.floor(seconds / 60) + '';
    let s = Math.ceil(seconds % 60) + '';
    return m.padStart(2, '0') + ':' + s.padStart(2, '0');
  }

  timeToSeconds(time) {
    return Number(time) * 60;
  }

  countdown() {
    let {remainingSeconds} = this.state;
    remainingSeconds--;
    this.setState({
      remainingSeconds,
      formattedTime: this.formattedTime(remainingSeconds),
    });

    if (remainingSeconds === 0) {
      const {isWorking, workTime, breakTime} = this.state;
      remainingSeconds = isWorking ?
        this.timeToSeconds(breakTime) : this.timeToSeconds(workTime);
      this.setState({
        isWorking: !isWorking,
        remainingSeconds,
      });
    }
  }

  componentWillUnMount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div>
        {this.state.formattedTime}
        <button
          className='button-start'
          onClick={this.startCountdown}>Start</button>
      </div>
    );
  }
};

export default Countdown;
