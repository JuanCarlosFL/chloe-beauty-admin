import { IconButton, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import EventIcon from '@material-ui/icons/Event';
import HealingIcon from '@material-ui/icons/Healing';
import { AuthRoutes } from 'core/auth';
import React from 'react';
import { useHistory } from 'react-router';

export const MenuComponent: React.FC = () => {
  const history = useHistory();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '2rem',
        }}
      >
        <IconButton
          size="medium"
          color="inherit"
          aria-label="Menu"
          onClick={() => history.push(AuthRoutes.customerList)}
        >
          <PersonIcon style={{ fontSize: '16vw' }} />
        </IconButton>
        <Typography variant="h4" color="inherit" style={{ marginLeft: '10px' }}>
          Clientes
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '2rem',
        }}
      >
        <IconButton
          size="medium"
          color="inherit"
          aria-label="Menu"
          onClick={() => history.push(AuthRoutes.loyaltyList)}
        >
          <LoyaltyIcon style={{ fontSize: '16vw' }} />
        </IconButton>
        <Typography variant="h4" color="inherit" style={{ marginLeft: '10px' }}>
          Ofertas
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '2rem',
        }}
      >
        <IconButton
          size="medium"
          color="inherit"
          aria-label="Menu"
          onClick={() => history.push(AuthRoutes.appointment)}
        >
          <EventIcon style={{ fontSize: '16vw' }} />
        </IconButton>
        <Typography variant="h4" color="inherit" style={{ marginLeft: '10px' }}>
          Citas
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '2rem',
        }}
      >
        <IconButton
          size="medium"
          color="inherit"
          aria-label="Menu"
          onClick={() => history.push(AuthRoutes.treatmentList)}
        >
          <HealingIcon style={{ fontSize: '16vw' }} />
        </IconButton>
        <Typography variant="h4" color="inherit" style={{ marginLeft: '10px' }}>
          Tratamientos
        </Typography>
      </div>
    </div>
  );
};
