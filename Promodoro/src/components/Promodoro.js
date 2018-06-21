import React from 'react';
import Countdown from './Countdown';
import CustomAppBar from './CustomAppBar';
import './Promodoro.css';
import Particles from 'react-particles-js';

class Promodoro extends React.Component {
  constructor() {
    super();

    this.state = {
      workTime: '25',
      breakTime: '5',
      isDarkTheme: false,
    };

    this.changeTime = this.changeTime.bind(this);
    this.switchTheme = this.switchTheme.bind(this);
  }

  changeTime(increaseTime, isWorkTime) {
    if (isWorkTime) {
      let {workTime} = this.state;
      if (workTime > 1 || increaseTime) {
        increaseTime ? workTime++ : workTime--;
        this.setState({workTime});
      }
    } else {
      let {breakTime} = this.state;
      if (breakTime > 1 || increaseTime) {
        increaseTime ? breakTime++ : breakTime--;
        this.setState({breakTime});
      }
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
    const particlesColor = isDarkTheme ? '#FAFAFA' : '#101010';

    return (
      <div className='promodoro' style={{backgroundColor: backgroundColor}}>
        <div>
          <CustomAppBar
            onChangeTime={changeTime}
            switchTheme={switchTheme}
            breakTime={breakTime}
            workTime={workTime}
            isDarkTheme={isDarkTheme}
          />
        </div>
        <div className='canvas'>
          <Particles
            className='particles'
            height='100%'
            width='100%'
            params={{
              particles: {
                number: {
                  value: 100,
                },
                color: {
                  value: particlesColor
                },
                'line_linked': {
                  color: particlesColor
                }
              }
            }}
          />
          <Countdown
            breakTime={breakTime}
            workTime={workTime}
            isDarkTheme={isDarkTheme}
            className='canvas'
          />
        </div>
      </div>
    );
  }
}

export default Promodoro;
