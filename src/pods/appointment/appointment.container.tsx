import { AuthRoutes } from 'core/auth';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppointmentComponent } from './appointment.component';


export const AppointmentContainer = () => {
    // Guardamos el historial
    const history = useHistory();
    // Función que se ejecuta al pinchar el botón volver y redirige al menú
    const handleBack = () => {
        history.push(AuthRoutes.menu);
    };
    // Llamamos al componente pasándole la función
    return (
        <>
            <AppointmentComponent handleBack={handleBack} />
        </>
    )
    
}