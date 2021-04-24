import { AuthRoutes } from 'core/auth';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppointmentComponent } from './appointment.component';


export const AppointmentContainer = () => {
    const history = useHistory();

    const handleBack = () => {
        history.push(AuthRoutes.menu);
    };

    return (
        <>
            <AppointmentComponent handleBack={handleBack} />
        </>
    )
    
}