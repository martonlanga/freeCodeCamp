import React from 'react';
import './Countdown.css';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import WorkIcon from 'material-ui/svg-icons/hardware/laptop';
import BreakIcon from 'material-ui/svg-icons/maps/local-cafe.js';
import CircularProgress from 'material-ui/CircularProgress';
import MediaQuery from 'react-responsive';
import ReactNotifications from 'react-browser-notifications';
import WorkLogo from './work.png';
import BreakLogo from './break.png';

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
      isDarkTheme,
    };

    this.playPause = this.playPause.bind(this);
    this.countdown = this.countdown.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

    if (remainingSeconds <= 0) {
      const {isWorking, workTime, breakTime} = this.state;
      remainingSeconds = isWorking ?
        timeToSeconds(breakTime) : timeToSeconds(workTime);
      this.setState({
        isWorking: !isWorking,
        remainingSeconds,
      });
      this.showNotification();
    }
  }

  showNotification() {
    if (this.n.supported()) {
      this.n.show();
    }
  }

  handleClick(event) {
    window.focus();
    this.n.close(event.target.tag);
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
    //TODO if change break time - dont update progress, don't allow less than 0
    const {formatTime, timeToSeconds, isWorking} = prevState;
    const workTime = nextProps.workTime;
    const breakTime = nextProps.breakTime;
    const isDarkTheme = nextProps.isDarkTheme;

    if (isDarkTheme !== prevState.isDarkTheme) {
      return {isDarkTheme};
    }

    if (breakTime !== prevState.breakTime) {
      if (isWorking) {
        return {
          breakTime,
        };
      } else {
        const remainingSeconds = timeToSeconds(breakTime);
        const formattedTime = formatTime(remainingSeconds);
        return {
          breakTime,
          remainingSeconds,
          formattedTime
        };
      }
    } else if (workTime !== prevState.workTime) {
      if (!isWorking) {
        return {
          workTime,
        };
      } else {
        const remainingSeconds = timeToSeconds(workTime);
        const formattedTime = formatTime(remainingSeconds);
        return {
          workTime,
          remainingSeconds,
          formattedTime
        };
      }
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
    const NotificationLogo = isWorking ? WorkLogo : BreakLogo;
    const NotificationTitle = isWorking ? 'Break time over' : 'Work time over';
    const NotificationBody = isWorking ?
      'Start working now' : 'Enjoy your break';
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
          <span style={{fontSize: '2em', color: color}}>
            {isWorking ? 'Working' : 'Break'}
          </span>
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
          <span style={{fontSize: '1.5em', color: color}}>
            {isWorking ? 'Working' : 'Break'}
          </span>
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
        <ReactNotifications
          onRef={ref => (this.n = ref)}
          title={NotificationTitle}
          body={NotificationBody}
          tag='abcdef'
          icon={NotificationLogo}
          timeout='4000'
          onClick={event => this.handleClick(event)}
        />
      </div>
    );
  }
};

export default Countdown;
