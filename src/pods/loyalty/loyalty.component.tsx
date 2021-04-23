import React, { useState } from 'react';
import { LoyaltyVM } from 'pods/loyalty-list/loaylty-list.vm';
import { Formik, Form, Field } from 'formik';
import { Button, FormControl, Grid, MenuItem, Select, withStyles } from '@material-ui/core';
import { TextFieldComponent } from 'common/form';
import { createEmptyTreatment, TreatmentVM } from 'pods/treatment-list/treatment-list.vm';

const CancelButton = withStyles(() => ({
    root: {
      backgroundColor: '#bb2124',
      '&:hover': {
        backgroundColor: '#c4383a',
      },
    },
}))(Button);

interface Props {
    id: string;
    loyalty: LoyaltyVM;
    treatments: TreatmentVM[];
    onCreate: (loyalty: LoyaltyVM) => void;
    onCancel: () => void;
}

export const LoyaltyComponent: React.FC<Props> = props => {
    const {id, loyalty, onCancel, onCreate, treatments} = props;
    const [treatment, setTreatment] = useState<TreatmentVM>(createEmptyTreatment);
    
    const handleChange = (event) => {
        loyalty.TreatmentId = event.target.value;
        setTreatment(treatments.filter(t => t.TreatmentId === event.target.value)[0]);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid
          container
          alignItems="center"
          direction="column"
          justify="center"
          style={{ padding: '10' }}
        >
          <Formik
            onSubmit={onCreate}
            initialValues={loyalty}
            enableReinitialize={true}
          >
            {() => (
              <Form>
                <div style={{ height: 30 }} />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: 400,
                    minWidth: 350,
                  }}
                >
                 <FormControl required >
                <Select
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    value={loyalty.TreatmentId}
                    name={treatment.Name}
                >
                    <MenuItem>
                        <em>Elija Tratamiento</em>
                    </MenuItem>
                    { treatments.map(item => <MenuItem key={item.TreatmentId} value={item.TreatmentId}>{item.Name}</MenuItem>) }
                </Select>
            </FormControl>
                  <Field name="LoyaltyId" label="Id" hidden />
                  <Field name="TreatmentName" label="TreatmentName" value={loyalty.TreatmentName} hidden />
                  <TextFieldComponent name="Points" type="number" label="Puntos" />
                  <Grid container justify="space-between" spacing={2}>
                    <Button
                      type="submit"
                      size="medium"
                      color="primary"
                      variant="contained"
                      style={{ marginTop: '25px' }}
                    >
                      Guardar
                    </Button>
                    <div style={{ height: 20 }} />
                    <CancelButton
                      color="secondary"
                      size="medium"
                      variant="contained"
                      onClick={onCancel}
                      style={{ marginTop: '25px' }}
                    >
                      Cancelar
                    </CancelButton>
                  </Grid>
                </div>
              </Form>
            )}
          </Formik>
        </Grid>
      </div>
    );
};
