import { ValidationSchema, Validators } from '@lemoncode/fonk';
import { createFormikValidation } from '@lemoncode/fonk-formik';
//import { rangeNumber } from '@lemoncode/fonk-range-number-validator';

const validationSchema: ValidationSchema = {
  field: {
    // Price: [
    //     Validators.required,
    //   {
    //     validator: rangeNumber,
    //     customArgs: {
    //                  min: {
    //                    value: 0,
    //                    inclusive: true,
    //                  },
    //                  max: {
    //                    value: 10000,
    //                    inclusive: true,
    //                  },
    //                },
    //   },
      
    // ],
    // Duration: [
      
    //     Validators.required,
    //     {
    //       validator: rangeNumber,
    //       customArgs: {
    //                    min: {
    //                      value: 0,
    //                      inclusive: true,
    //                    },
    //                    max: {
    //                      value: 10000,
    //                      inclusive: true,
    //                    },
                     
    //   },
    // }
    // ],
    Name: [
      {
        validator: Validators.required.validator,
        message: 'El nombre es obligatorio',
      },
    ],
  },
};

export const formValidation = createFormikValidation(validationSchema);