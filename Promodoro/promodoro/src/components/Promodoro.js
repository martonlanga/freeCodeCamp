import React from 'react';
import Countdown from './Countdown';
import CustomAppBar from './CustomAppBar';
import './Promodoro.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class Promodoro extends React.Component {
  constructor() {
    super();

    this.state = {
      workTime: '25',
      breakTime: '2',
    };

    this.changeTime = this.changeTime.bind(this);
  }

  componentDidMount() {

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

  render() {
    const {workTime, breakTime} = this.state;
    const {changeTime} = this;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)} >
      <div className='promodoro'>
        <CustomAppBar
          onChangeTime={changeTime}
          breakTime={breakTime}
          workTime={workTime}
        />
        <Countdown
          breakTime={breakTime}
          workTime={workTime}
        />
      </div>
    </MuiThemeProvider>
    );
  }
}

export default Promodoro;
