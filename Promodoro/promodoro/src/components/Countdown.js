import React from 'react';
import './Countdown.css';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import WorkIcon from 'material-ui/svg-icons/hardware/laptop';
import BreakIcon from 'material-ui/svg-icons/maps/local-cafe.js';
import CircularProgress from 'material-ui/CircularProgress';
import MediaQuery from 'react-responsive';

class Countdown extends React.Component {
  constructor(props) {
    super();

    let {workTime, breakTime, isDarkTheme} = props;
    const isWorking = true;
    const isRunning = false;
    const timeToSeconds = time => Number(time) * 60;
    const formatTime = (seconds) => {
      return (Math.floor(seconds / 60) + '').padStart(2, '0') +
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
      formatTime,
      isDarkTheme
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
    const isDarkTheme = nextProps.isDarkTheme;

    if (isDarkTheme !== prevState.isDarkTheme) {
      return {isDarkTheme};
    }

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
      formattedTime,
      isDarkTheme
    };
  }

  render() {
    const {isRunning, formattedTime, isDarkTheme, isWorking} = this.state;
    const color = isDarkTheme ? '#FAFAFA' : '#424242';
    return (
      <div className='countdown'>
        <MediaQuery query='(min-device-width: 1224px)'>
          <div className='circular-progress'>
            <CircularProgress
              max={1}
              min={0}
              mode='determinate'
              value={this.progress()}
              size={500}
              color={color}
            >
            </CircularProgress>
          </div>
          <span style={{fontSize: '2em', color: color}}>Working</span>
          {isWorking ?
            <WorkIcon
              style={{height: '15vh', width: '15vw'}}
              color={color}
            /> :
            <BreakIcon
              style={{height: '15vh', width: '15vw'}}
              color={color}
            />
          }
          <br />
          <span style={{fontSize: '4em',color: color}}>
            {formattedTime}
          </span>
          <FloatingActionButton
            className='button-action'
            onClick={this.playPause}
            >
            {isRunning ? <Pause /> : <PlayArrow />}
          </FloatingActionButton>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1223px)'>
          <div className='circular-progress'>
            <CircularProgress
              max={1}
              min={0}
              mode='determinate'
              value={this.progress()}
              size={250}
              color={color}
            >
            </CircularProgress>
          </div>
          <span style={{fontSize: '1.5em', color: color}}>Working</span>
          {isWorking ?
            <WorkIcon
              style={{height: '8vh', width: '8vw'}}
              color={color}
            /> :
            <BreakIcon
              style={{height: '8vh', width: '8vw'}}
              color={color}
            />
          }
          <span style={{fontSize: '2em',color: color}}>
            {formattedTime}
          </span>
          <FloatingActionButton
            className='button-action'
            onClick={this.playPause}
            >
            {isRunning ? <Pause /> : <PlayArrow />}
          </FloatingActionButton>
        </MediaQuery>

      </div>
    );
  }
};

export default Countdown;
