import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
//Esta es la entrada a la aplicación y renderiza en el id root del index.html el componente App
ReactDOM.render( 
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <App />
    </MuiPickersUtilsProvider>, 
document.getElementById('root'));
