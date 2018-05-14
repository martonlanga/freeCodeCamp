import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Promodoro from './components/Promodoro';
import './index.css';

const App = () => {
  return (
    <MuiThemeProvider>
      <Promodoro />
    </MuiThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
