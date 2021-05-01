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
import { NextAppointmentsContainer } from 'common/components/next-appointments/next-appointments.container';
import locale from 'date-fns/locale/es';
// Tipamos las props
interface Props {
  handleBack: () => void;
}
// Modificamos estilos
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
// Url del endpoint de la api que necesitamos
const url = `${process.env.API_URL}/availability`;

export const AppointmentComponent: React.FC<Props> = (props) => {
  // Usamos los estilos modificados
  const classes = useStyles();
  // Creamos una variable a false para el alert
  const [open, setOpen] = useState(false);
  // Guardamos la función para volver al menú
  const { handleBack } = props;
  // Creamos una fecha con la fecha y hora actual
  const [selectedDate, handleDateChange] = useState(new Date());
  // Traemos el token del context
  const { token } = useContext(SessionContext);
  // Función para confirmar la disponibilidad
  const confirmAvailability = async () => {
    // Creamos una disponibilidad con la fecha guardada e id a 0 para que en la bbdd se cree una nueva disponibilidad
    let availability: AvailabilityVM = {
      AvailabilityId: 0,
      Date: selectedDate
    }
    // Guardamos la respuesta de la api al crear la disponibilidad
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(availability),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }
    });
    const data = await response.json();
    // Si es true abrimos el alert para informar de que se ha creado correctamente
    if (data === true)
      setOpen(true);
  }
  // Si pincha en cerrar el alert ponemos open a false
  const handleClose = (event, reason) => {
    if (reason === 'clickaway'){
      return
    }
    setOpen(false);
  }

  // Pintamos el componente usando un datepicker de material ui para seleccionar la fecha y la hora y pintamos el componente de próximas citas
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
        <NextAppointmentsContainer />
      </div>
      <CustomAlert message='Disponibilidad Guardada' severity='success' open={open} handleClose={handleClose} />
    </MuiPickersUtilsProvider>
  )
}