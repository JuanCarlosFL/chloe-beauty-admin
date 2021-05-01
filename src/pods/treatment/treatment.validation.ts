import { ValidationSchema, Validators } from '@lemoncode/fonk';
import { createFormikValidation } from '@lemoncode/fonk-formik';
// Usamos la librería fonk para las validaciones necesarias para el formulario
const validationSchema: ValidationSchema = {
  field: {
    Name: [
      {
        validator: Validators.required.validator,
        message: 'El nombre es obligatorio',
      },
    ],
  },
};

export const formValidation = createFormikValidation(validationSchema);