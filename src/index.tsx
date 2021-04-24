import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

ReactDOM.render( 
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <App />
    </MuiPickersUtilsProvider>, 
document.getElementById('root'));
