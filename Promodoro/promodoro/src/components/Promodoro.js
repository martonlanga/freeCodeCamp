import React from 'react';
import Countdown from './Countdown';
import AppBar from 'material-ui/AppBar';
import AlarmIcon from 'material-ui/svg-icons/action/alarm';
import {white} from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
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

  render() {
    const {workTime, breakTime} = this.state;
    return (
      <div className='promodoro'>
        <AppBar
          title='Promodoro Clock'
          className='appbar'
          iconElementLeft={<AlarmIcon color={white} />}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText='Work time' />
              <MenuItem primaryText='Break time' />
              <MenuItem primaryText='Dark theme' />
            </IconMenu>
          }
        />
        <Countdown
          breakTime={breakTime}
          workTime={workTime}
        />
      </div>
    );
  }
}

export default Promodoro;
