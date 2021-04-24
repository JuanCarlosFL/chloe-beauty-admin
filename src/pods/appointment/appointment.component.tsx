import React, { useContext, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { Button, makeStyles } from '@material-ui/core';
import { SessionContext } from 'core/session-context';
import { AvailabilityVM } from './appointment.vm';
import { CustomAlert } from 'common/components/alert';
import { AvailabilitiesContainer } from 'common/components/availabilities/availabilities.container';
import locale from 'date-fns/locale/es';

interface Props {
  handleBack: () => void;
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  margin: {
    margin: "10px",
  }
}));

const url = `${process.env.API_URL}/availability`;


export const AppointmentComponent: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { handleBack } = props;
  const [selectedDate, handleDateChange] = useState(new Date());
  const { token } = useContext(SessionContext);

  const confirmAvailability = async () => {
    let availability: AvailabilityVM = {
      AvailabilityId: 0,
      Date: selectedDate
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(availability),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }
    });
    const data = await response.json();

    if (data === true)
      setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway'){
      return
    }
    setOpen(false);
}


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
      <div className={classes.container}>
        <h3>Selecciona la fecha para añadir la disponibilidad</h3>
        <DateTimePicker value={selectedDate} onChange={handleDateChange} className={classes.margin} format="dd/MM/yyy hh:mm"/>
        <div  className={classes.margin}>
          <Button variant="contained" color="secondary" onClick={handleBack}  className={classes.margin} >
            Volver
          </Button>
          <Button variant="contained" color="primary" onClick={confirmAvailability}>
            Confirmar disponibilidad
          </Button>
        </div>
        <h3>Próximas citas</h3>
        <AvailabilitiesContainer />
      </div>
      <CustomAlert message='Disponibilidad Guardada' severity='success' open={open} handleClose={handleClose} />
    </MuiPickersUtilsProvider>
  )
}