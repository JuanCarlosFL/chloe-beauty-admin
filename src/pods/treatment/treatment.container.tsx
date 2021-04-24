import React, { useContext, useEffect, useState } from 'react';
import { CustomAlert } from 'common/components/alert';
import { AuthRoutes } from 'core/auth';
import { mapTreatmentFromApiToVm } from 'pods/treatment-list/treatment-list.mapper';
import { TreatmentVM, createEmptyTreatment } from 'pods/treatment-list/treatment-list.vm';
import { useParams, useHistory } from 'react-router-dom';
import { TreatmentComponent } from './treatment.component';
import { SessionContext } from 'core/session-context';

const url = `${process.env.API_URL}/treatment`;

interface Params {
    id: string;
}

export const TreatmentContainer: React.FC = () => {
    const { token } = useContext(SessionContext);
    const [open, setOpen] = useState(false);
    const { id } = useParams<Params>();
    const [treatment, setTreatment] = useState<TreatmentVM>(createEmptyTreatment);
    const history = useHistory();

    const getTreatment = async (id: string) => {
      const response = await fetch(`${url}/${id}`, {
        headers: {
          'Authorization': `bearer ${token}`
        }
      });
      const data = await response.json();
      setTreatment(mapTreatmentFromApiToVm(data));
    };
  
    const handlingCreate = async (treatment: TreatmentVM) => {
      if (treatment.TreatmentId === 0){
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
          setOpen(true);
        else 
          history.push(AuthRoutes.treatmentList);
  
      } else {
        await fetch(`${url}/${treatment.TreatmentId}`, {
          method: 'PUT',
          body: JSON.stringify(treatment),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
          },
        });
  
        history.push(AuthRoutes.treatmentList);
      }
    };

    const handlingCancel = () => {
      history.push(AuthRoutes.treatmentList);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway'){
        return
      }
      setOpen(false);
    }

    useEffect(() => {
      if (id !== '0') {
        getTreatment(id);
      }
    }, []);
    
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