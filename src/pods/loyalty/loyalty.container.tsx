import React, { useContext, useEffect, useState } from 'react';
import { CustomAlert } from 'common/components/alert';
import { AuthRoutes } from 'core/auth';
import { mapLoyaltyFromApiToVm } from 'pods/loyalty-list/loyalty-list.mapper';
import { LoyaltyVM, createEmptyLoyalty } from 'pods/loyalty-list/loaylty-list.vm';
import { useParams, useHistory } from 'react-router-dom';
import { LoyaltyComponent } from './loyalty.component';
import { createEmptyTreatment, TreatmentVM } from 'pods/treatment-list/treatment-list.vm';
import { mapTreatmentListFromApiToVm } from 'pods/treatment-list/treatment-list.mapper';
import { SessionContext } from 'core/session-context';
// Urls de los endpoints de la api necesarios
const url = `${process.env.API_URL}/loyalty`;
const urlTreatments = `${process.env.API_URL}/treatment`;
// Tipamos las props
interface Params {
    id: string;
}

export const LoyaltyContainer: React.FC = () => {
  // Guardamos el token del conte
    const { token } = useContext(SessionContext);
    // Creamos una variable a false para el alert
    const [open, setOpen] = useState(false);
    // Guardamos el id que viene por parámetro en la url
    const { id } = useParams<Params>();
    // Creamos un array de tratamientos vacío
    const [treatments, setTreatments] = useState<TreatmentVM[]>([]);
    // Creamos una oferta vacía
    const [loyalty, setLoyalty] = useState<LoyaltyVM>(createEmptyLoyalty);
    // Guardamos el historial del navegador
    const history = useHistory();

    // Obtenemos los datos de la oferta cuyo id se ha recibido por parámetro
    const getLoyalty = async (id: string) => {
        const response = await fetch(`${url}/${id}`, {
          headers: {
            'Authorization': `bearer ${token}`
          }
        });
        const data = await response.json();
        // A la oferta recibida le creamos un tratamiento vacío y actualizamos
        data.Treatment = createEmptyTreatment;
        setLoyalty(mapLoyaltyFromApiToVm(data));
    }
    // Obtenemos la lista de tratamientos y la actualizamos
    const getTreatments = async () => {
        const response = await fetch(`${urlTreatments}`, {
          headers: {
            'Authorization': `bearer ${token}`
          }
        });
        const data = await response.json();
        setTreatments(mapTreatmentListFromApiToVm(data));
    }
    // Función para crear o modificar un registro
    const handlingCreate = async (loyalty: LoyaltyVM) => {
      // Comprobamos si el id es 0
      if (loyalty.LoyaltyId === 0){
        // Si es así es un registro nuevo y mandamos al post de la api para que lo cree
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(loyalty),
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
          history.push(AuthRoutes.loyaltyList);
  
      } else {
        // Si el id no es 0 es que la oferta existe y se ha modificado, así que lo mandamos al endpoint del PUT de la api
        await fetch(`${url}/${loyalty.LoyaltyId}`, {
          method: 'PUT',
          body: JSON.stringify(loyalty),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
          },
        });
        // Redirigimos a la lista para mostrarla con los cambios realizados en la oferta
        history.push(AuthRoutes.loyaltyList);
      }
    };
    // Función para volver a la lista al pinchar en el botón
    const handlingCancel = () => {
        history.push(AuthRoutes.loyaltyList);
    };
    // Función para cerrar el alert
    const handleClose = (event, reason) => {
      if (reason === 'clickaway'){
        return
      }
      setOpen(false);
    }
    useEffect(() => {
      // Cuando se pinta el compoente cargamos los tratamientos
      getTreatments();
      // Y comprobamos si el id es 0
      if (id !== '0') {
        // Si es distindo de 0 cargamos los datos de la oferta
        getLoyalty(id);
      }
    }, []);
    // Llamamos al componente pasándole por props los datos
    return (
      <>
        <LoyaltyComponent 
            id={id} 
            onCreate={handlingCreate}
            loyalty={loyalty} 
            onCancel={handlingCancel}
            treatments={treatments}
        />
        <CustomAlert message='Esa oferta ya existe' severity='error' open={open} handleClose={handleClose} />
      </>
    )
};
