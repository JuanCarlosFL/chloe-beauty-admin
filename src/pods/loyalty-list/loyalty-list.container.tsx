import { AuthRoutes } from 'core/auth';
import React, { useEffect, useState } from 'react';
import { generatePath, useHistory } from 'react-router';
import { deleteLoyalty, getLoyaltyList } from './api/loyalty-list.api';
import { LoyaltyVM } from './loaylty-list.vm';
import { LoyaltyListComponent } from './loyalty-list.component';
import { mapLoyaltyListFromApiToVm } from './loyalty-list.mapper';

export const LoyaltyListContainer: React.FC = () => {
    const [loyalties, setLoyalties] = useState<LoyaltyVM[]>([]);
    const history = useHistory();

    const onLoadLoyaltyList = async () => {
        try {
          const apiLoyaltyList = await getLoyaltyList();
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
        try {
          const res = prompt(
            `¿Seguro que quieres borrar esta oferta ${id}? (S/N)`
          );
          if (res === 'S') {
            const isDeleted = await deleteLoyalty(id);
            isDeleted ? onLoadLoyaltyList() : null;
          }
        } catch (error) {
          console.error(error);
        }
    };

    const handleEdit = (id: string) => {
        history.push(generatePath(AuthRoutes.loyalty, { id }));
    };
    
      const handleCreate = (id: string) => {
        history.push(generatePath(AuthRoutes.loyalty, { id }));
    }

    useEffect(() => {
        onLoadLoyaltyList();
    }, []);

    return (<LoyaltyListComponent 
                loyaltyList={loyalties}
                handleDelete={handleDelete}
                handleBack={handleBack}
                handleEdit={handleEdit}
                handleCreate={handleCreate}
            />
    );
}