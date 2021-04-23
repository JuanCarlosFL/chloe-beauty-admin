import React, { useContext, useEffect, useState } from 'react';
import { CustomAlert } from 'common/components/alert';
import { AuthRoutes } from 'core/auth';
import { mapLoyaltyFromApiToVm } from 'pods/loyalty-list/loyalty-list.mapper';
import { LoyaltyVM, createEmptyLoyalty } from 'pods/loyalty-list/loaylty-list.vm';
import { useParams, useHistory } from 'react-router-dom';
import { LoyaltyComponent } from './loyalty.component';
import { createEmptyTreatment, TreatmentVM } from 'pods/treatment-list/treatment-list.vm';
import { mapTreatmentListFromApiToVm } from 'pods/treatment-list/treatment-list.mapper';
import { CodeOutlined } from '@material-ui/icons';
import { SessionContext } from 'core/session-context';

const url = `${process.env.API_URL}/loyalty`;
const urlTreatments = `${process.env.API_URL}/treatment`;

interface Params {
    id: string;
}

export const LoyaltyContainer: React.FC = () => {
    const { token } = useContext(SessionContext);
    const [open, setOpen] = useState(false);
    const { id } = useParams<Params>();
    const [treatments, setTreatments] = useState<TreatmentVM[]>([]);
    const [loyalty, setLoyalty] = useState<LoyaltyVM>(createEmptyLoyalty);
    const history = useHistory();

    const getLoyalty = async (id: string) => {
        const response = await fetch(`${url}/${id}`, {
          headers: {
            'Authorization': `bearer ${token}`
          }
        });
        const data = await response.json();
        data.Treatment = createEmptyTreatment;
        setLoyalty(mapLoyaltyFromApiToVm(data));
    }

    const getTreatments = async () => {
        const response = await fetch(`${urlTreatments}`, {
          headers: {
            'Authorization': `bearer ${token}`
          }
        });
        const data = await response.json();
        setTreatments(mapTreatmentListFromApiToVm(data));
    }

    const handlingCreate = async (loyalty: LoyaltyVM) => {
        if (loyalty.LoyaltyId === 0){
          const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(loyalty),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `bearer ${token}`
            },
          });
          const data = await response.json();
          console.log(data);
    
          if (data === false)
            setOpen(true);
          else 
            history.push(AuthRoutes.loyaltyList);
    
        } else {
          await fetch(`${url}/${loyalty.LoyaltyId}`, {
            method: 'PUT',
            body: JSON.stringify(loyalty),
            headers: {
              'Content-type': 'application/json',
              'Authorization': `bearer ${token}`
            },
          });
    
          history.push(AuthRoutes.loyaltyList);
        }
      };

    const handlingCancel = () => {
        history.push(AuthRoutes.loyaltyList);
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway'){
          return
        }
        setOpen(false);
      }
  
      useEffect(() => {
          getTreatments();
        if (id !== '0') {
          getLoyalty(id);
        }
      }, []);
    
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
