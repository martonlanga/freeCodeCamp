import React from 'react';
import './Countdown.css';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
const ProgressBar = require('react-progress-bar.js');
const Circle = ProgressBar.Circle;

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
      <div className='countdown'>
        <div>
          <Circle
            progress={0.5}
            text={this.state.formattedTime}
            className='circle'
          >
            <div>asd</div>
        </Circle>
        </div>
        <FloatingActionButton
          className='button-start'
          onClick={this.startCountdown}>
          <PlayArrow />
        </FloatingActionButton>
      </div>
    );
  }
};

export default Countdown;
