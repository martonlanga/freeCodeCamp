import React from 'react';
import AppBar from 'material-ui/AppBar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import {white} from 'material-ui/styles/colors';
import AlarmIcon from 'material-ui/svg-icons/action/alarm';

const CustomAppBar = (props) => {
  console.log(props);
  return (
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
  );
};

export default CustomAppBar;
