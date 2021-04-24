import { AuthRoutes } from 'core/auth';
import { SessionContext } from 'core/session-context';
import React, { useContext, useEffect, useState } from 'react';
import { generatePath, useHistory } from 'react-router';
import { deleteLoyalty, getLoyaltyList } from './api/loyalty-list.api';
import { LoyaltyVM } from './loaylty-list.vm';
import { LoyaltyListComponent } from './loyalty-list.component';
import { mapLoyaltyListFromApiToVm } from './loyalty-list.mapper';
import { AlertDialog } from 'common/components/prompt';

export const LoyaltyListContainer: React.FC = () => {
    const [idLoyalty, setIdLoyalty] = useState<number>(0);
    const [open, setOpen] = useState(false);
    const { token } = useContext(SessionContext);
    const [loyalties, setLoyalties] = useState<LoyaltyVM[]>([]);
    const history = useHistory();

    const onLoadLoyaltyList = async () => {
        try {
          const apiLoyaltyList = await getLoyaltyList(token);
          const viewModelLoyaltyList = mapLoyaltyListFromApiToVm(apiLoyaltyList);
          setLoyalties(viewModelLoyaltyList);
        } catch (error) {
          console.error(error);
        }
    };

    const handleBack = () => {
        history.push(AuthRoutes.menu);
    };

    const handleDelete = async (id: number) => {
      setOpen(true);
      setIdLoyalty(id);
    };

    const confirmDelete = async () => {
      const isDeleted = await deleteLoyalty(idLoyalty, token);
      isDeleted ? onLoadLoyaltyList() : null;
    }

    const handleEdit = (id: string) => {
        history.push(generatePath(AuthRoutes.loyalty, { id }));
    };
    
      const handleCreate = (id: string) => {
        history.push(generatePath(AuthRoutes.loyalty, { id }));
    }

    useEffect(() => {
        onLoadLoyaltyList();
    }, []);

    return (
      <>
        <LoyaltyListComponent 
            loyaltyList={loyalties}
            handleDelete={handleDelete}
            handleBack={handleBack}
            handleEdit={handleEdit}
            handleCreate={handleCreate}
        />
        <AlertDialog  title="Borrar Oferta"
          open={open}
          setOpen={setOpen}
          onConfirm={confirmDelete}>
            ¿Seguro que quiere borrar esta oferta?
        </AlertDialog>
      </>
    );
}