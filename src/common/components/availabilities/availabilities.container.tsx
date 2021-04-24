import { SessionContext } from 'core/session-context';
import React, { useContext, useEffect, useState } from 'react';
import { AvailabilitiesComponent } from './availabilities.component';
import { AppointmentsVM } from './availabilities.vm';

const url = `${process.env.API_URL}/appointment`;

export const AvailabilitiesContainer: React.FC = () => {
    const { token } = useContext(SessionContext);
    const [ appointments, setAppointments ] = useState<AppointmentsVM[]>([]);

    const handleLoadAppointments = async () => {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
        });
        const data = await response.json();
        setAppointments(data);
    }

    useEffect(() => {
        handleLoadAppointments();
    }, [])

    return <AvailabilitiesComponent appointments={appointments}/>
}