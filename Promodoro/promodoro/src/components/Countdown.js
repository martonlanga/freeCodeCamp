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
    const isRunning = false;

    this.state = {
      remainingSeconds,
      formattedTime,
      isWorking,
      workTime,
      breakTime,
      isRunning,
    };

    this.playPause = this.playPause.bind(this);
    this.countdown = this.countdown.bind(this);
  }

  playPause() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = 0;
      this.setState({
        isRunning: false,
      });
    } else {
      this.timerId = setInterval(this.countdown, 1000);
      this.setState({
        isRunning: true,
      });
    }
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

  progress() {
    const {isWorking, remainingSeconds, workTime, breakTime} = this.state;
    return isWorking ?
      (remainingSeconds / 60 / workTime) : (remainingSeconds / 60 / breakTime);
  }

  componentWillUnMount() {
    clearInterval(this.timerId);
  }

  render() {
    const {isRunning} = this.state;
    return (
      <div className='countdown'>
        <div>
          <Circle
            progress={this.progress()}
            text={this.state.formattedTime}
            className='circle'
          >
            <div>asd</div>
        </Circle>
        </div>
        <FloatingActionButton
          className='button-action'
          onClick={this.playPause}>
          {isRunning ? <Pause /> : <PlayArrow />}
        </FloatingActionButton>
      </div>
    );
  }
};

export default Countdown;
