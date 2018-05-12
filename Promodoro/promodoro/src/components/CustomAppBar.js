import React from 'react';
import AppBar from 'material-ui/AppBar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import {white} from 'material-ui/styles/colors';
import AlarmIcon from 'material-ui/svg-icons/action/alarm';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Toggle from 'material-ui/Toggle';

const CustomAppBar = (props) => {
  const {onChangeTime, workTime, breakTime} = props;
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
          <div style={{margin: '20px'}}>
            <ChangeTimeButtons
              time={workTime}
              isWorkTime={true}
              onChangeTime={onChangeTime}
             />
            <ChangeTimeButtons
               time={breakTime}
               isWorkTime={false}
               onChangeTime={onChangeTime}
             />
            <Toggle label='Dark theme' />
          </div>
        </IconMenu>
      }
    />
  );
};

const ChangeTimeButtons = (props) => {
  const {onChangeTime, isWorkTime, time} = props;
  const style = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px'
  };
  return (
    <div style={style}>
      <FloatingActionButton
        mini={true}
        onClick={() => onChangeTime(true, isWorkTime)}
        >
        <ContentAdd />
      </FloatingActionButton>
      <div style={{textAlign: 'center'}}>
        <span style={{fontSize: '0.8em'}}>
          {isWorkTime ? 'Work Time' : 'Break Time'}
        </span>
        <br/>
        <span>
          {time}
        </span>
      </div>
      <FloatingActionButton
        mini={true}
        onClick={() => onChangeTime(false, isWorkTime)}
        >
        <ContentRemove />
      </FloatingActionButton>
    </div>
  );
};

export default CustomAppBar;
