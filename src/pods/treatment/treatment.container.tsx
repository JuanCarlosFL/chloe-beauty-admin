import React, { useContext, useEffect, useState } from 'react';
import { CustomAlert } from 'common/components/alert';
import { AuthRoutes } from 'core/auth';
import { mapTreatmentFromApiToVm } from 'pods/treatment-list/treatment-list.mapper';
import { TreatmentVM, createEmptyTreatment } from 'pods/treatment-list/treatment-list.vm';
import { useParams, useHistory } from 'react-router-dom';
import { TreatmentComponent } from './treatment.component';
import { SessionContext } from 'core/session-context';
// Url del endpoint de la api necesarios
const url = `${process.env.API_URL}/treatment`;
// Tipamos las props
interface Params {
    id: string;
}

export const TreatmentContainer: React.FC = () => {
  // Guardamos el token del context
  const { token } = useContext(SessionContext);
  // Creamos una variable a false para el alert
  const [open, setOpen] = useState(false);
  // Guardamos el id que viene por parámetro en la url
  const { id } = useParams<Params>();
  // Creamos un tratamiento vacío
  const [treatment, setTreatment] = useState<TreatmentVM>(createEmptyTreatment);
  // Guardamos el historial del navegador
  const history = useHistory();

  // Obtenemos los datos del tratamiento cuyo id se ha recibido por parámetro
  const getTreatment = async (id: string) => {
    const response = await fetch(`${url}/${id}`, {
      headers: {
        'Authorization': `bearer ${token}`
      }
    });
    const data = await response.json();
    // Actualizamos los datos mapeando los datos que vienen de la api
    setTreatment(mapTreatmentFromApiToVm(data));
  };

  // Función para crear o modificar un registro
  const handlingCreate = async (treatment: TreatmentVM) => {
    // Comprobamos si el id es 0
    if (treatment.TreatmentId === 0){
      // Si es así es un registro nuevo y mandamos al post de la api para que lo cree
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(treatment),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        },
      });
      const data = await response.json();

      if (data === false)
        // Si el resultado de la api es false abrimos el alert para informar del error
        setOpen(true);
      else 
        // Si no redirigimos a mostrar la lista con el nuevo registro
        history.push(AuthRoutes.treatmentList);

    } else {
      // Si el id no es 0 es que el usuario existe y se ha modificado, así que lo mandamos al endpoint del PUT de la api
      await fetch(`${url}/${treatment.TreatmentId}`, {
        method: 'PUT',
        body: JSON.stringify(treatment),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        },
      });
      // Redirigimos a la lista para mostrarla con los cambios realizados en el usuario
      history.push(AuthRoutes.treatmentList);
    }
  };
  // Función para volver a la lista al pinchar en el botón
  const handlingCancel = () => {
    history.push(AuthRoutes.treatmentList);
  };
  // Función para cerrar el alert
  const handleClose = (event, reason) => {
    if (reason === 'clickaway'){
      return
    }
    setOpen(false);
  }

  useEffect(() => {
    // Cuando se pinta el componente comprobamos si el id es 0
    if (id !== '0') {
      // Si es distindo de 0 cargamos los datos del tratamiento
      getTreatment(id);
    }
  }, []);
  // Llamamos al componente pasándole por props los datos
  return (
    <>
      <TreatmentComponent
      id={id}
      onCreate={handlingCreate}
      treatment={treatment}
      onCancel={handlingCancel} />
      <CustomAlert message='Ese tratamiento ya existe' severity='error' open={open} handleClose={handleClose} />
      </>
    
  );
}