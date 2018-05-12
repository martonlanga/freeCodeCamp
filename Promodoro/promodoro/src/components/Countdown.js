import React from 'react';
import './Countdown.css';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import CircularProgress from 'material-ui/CircularProgress';

class Countdown extends React.Component {
  constructor(props) {
    super();

    console.log('1');
    let {workTime, breakTime} = props;
    const isWorking = true;
    const isRunning = false;
    const timeToSeconds = time => Number(time) * 60;
    const formatTime = seconds => {
      (Math.floor(seconds / 60) + '').padStart(2, '0') +
      ':' + (Math.ceil(seconds % 60) + '').padStart(2, '0');
    };
    const remainingSeconds = timeToSeconds(workTime);
    const formattedTime = formatTime(remainingSeconds);

    this.state = {
      remainingSeconds,
      isWorking,
      workTime,
      breakTime,
      isRunning,
      timeToSeconds,
      formattedTime,
      formatTime
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

  countdown() {
    let {remainingSeconds, formatTime, timeToSeconds} = this.state;
    remainingSeconds--;
    this.setState({
      remainingSeconds,
      formattedTime: formatTime(remainingSeconds),
    });

    if (remainingSeconds === 0) {
      const {isWorking, workTime, breakTime} = this.state;
      remainingSeconds = isWorking ?
        timeToSeconds(breakTime) : timeToSeconds(workTime);
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

  static getDerivedStateFromProps(nextProps, prevState) {
    const {formatTime, timeToSeconds} = prevState;
    const workTime = nextProps.workTime;
    const breakTime = nextProps.breakTime;

    console.log(nextProps);
    console.log(prevState);

    if (breakTime !== prevState.breakTime) {
      const remainingSeconds = timeToSeconds(breakTime);
      const formattedTime = formatTime(remainingSeconds);
      return {
        breakTime,
        remainingSeconds,
        formattedTime

      };
    } else if (workTime !== prevState.workTime) {
      const remainingSeconds = timeToSeconds(workTime);
      const formattedTime = formatTime(remainingSeconds);
      return {
        workTime,
        remainingSeconds,
        formattedTime
      };
    }
    const remainingSeconds = timeToSeconds(workTime);
    const formattedTime = formatTime(remainingSeconds);

    return {
      remainingSeconds,
      workTime,
      breakTime,
      formattedTime
    };
  }

  render() {
    const {isRunning} = this.state;
    console.log(this.state);
    return (
      <div className='countdown'>
        <div>
          <CircularProgress
            max={1}
            min={0}
            mode='determinate'
            value={this.progress()}
          >
          </CircularProgress>

        </div>
        <FloatingActionButton
          className='button-action'
          onClick={this.playPause}
          >
          {isRunning ? <Pause /> : <PlayArrow />}
        </FloatingActionButton>
      </div>
    );
  }
};

export default Countdown;
