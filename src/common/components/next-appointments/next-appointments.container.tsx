import { SessionContext } from 'core/session-context';
import React, { useContext, useEffect, useState } from 'react';
import { NextAppointmentsComponent } from './next-appointments.component';
import { NextAppointmentsVM } from './next-appointments.vm';

const url = `${process.env.API_URL}/appointment`;

export const NextAppointmentsContainer: React.FC = () => {
    // Traemos el token del context
    const { token } = useContext(SessionContext);
    // Creamos un array de citas vacío
    const [ appointments, setAppointments ] = useState<NextAppointmentsVM[]>([]);
    // Función que carga la lista de citas
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
    // Cargamos las citas cuando se monta el componente
    useEffect(() => {
        handleLoadAppointments();
    }, [])
    // Llamamos al componente pasándole la colección de citas
    return <NextAppointmentsComponent appointments={appointments}/>
}