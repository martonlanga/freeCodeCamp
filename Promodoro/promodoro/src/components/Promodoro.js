import React from 'react';
import Countdown from './Countdown';
import CustomAppBar from './CustomAppBar';
import './Promodoro.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Promodoro extends React.Component {
  constructor() {
    super();

    this.state = {
      workTime: '0.1',
      breakTime: '0.1',
      isDarkTheme: false,
    };

    this.changeTime = this.changeTime.bind(this);
    this.switchTheme = this.switchTheme.bind(this);
  }

  changeTime(increaseTime, isWorkTime) {
    if (isWorkTime) {
      let {workTime} = this.state;
      increaseTime ? workTime++ : workTime--;
      this.setState({workTime});
    } else {
      let {breakTime} = this.state;
      increaseTime ? breakTime++ : breakTime--;
      this.setState({breakTime});
    }
  }

  switchTheme() {
    const {isDarkTheme} = this.state;
    const newIsDarkTheme = !isDarkTheme;
    this.setState({
      isDarkTheme: newIsDarkTheme,
    });
  }

  render() {
    const {workTime, breakTime, isDarkTheme} = this.state;
    const {changeTime, switchTheme} = this;
    const backgroundColor = isDarkTheme ? '#101010' : '#FAFAFA';

    return (
      <div className='promodoro' style={{backgroundColor: backgroundColor}}>
          <CustomAppBar
          onChangeTime={changeTime}
          switchTheme={switchTheme}
          breakTime={breakTime}
          workTime={workTime}
          isDarkTheme={isDarkTheme}
        />
          <Countdown
          breakTime={breakTime}
          workTime={workTime}
          isDarkTheme={isDarkTheme}
        />
        </div>
    );
  }
}

export default Promodoro;
