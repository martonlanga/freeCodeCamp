import React from 'react';
import AppBar from 'material-ui/AppBar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import {white} from 'material-ui/styles/colors';
import AlarmIcon from 'material-ui/svg-icons/action/alarm';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Toggle from 'material-ui/Toggle';

const CustomAppBar = (props) => {
  const {onChangeTime} = props;
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
          <MenuItem primaryText='Work time' disabled='true'><Add onChangeTime={onChangeTime}/></MenuItem>
          <MenuItem primaryText='Break time' disabled='true'><Add onChangeTime={onChangeTime}/></MenuItem>
          <MenuItem disabled='true'><Toggle label='Dark theme' /></MenuItem>
        </IconMenu>
      }
    />
  );
};

const Add = (props) => {
  const {onChangeTime} = props;
  return (
    <div>
      <FloatingActionButton onClick={() => onChangeTime('+')}>
        <ContentAdd />
      </FloatingActionButton>
      <span>25</span>
      <FloatingActionButton onClick={() => onChangeTime('-')}>
        <ContentRemove />
      </FloatingActionButton>
    </div>
  );
};

export default CustomAppBar;
