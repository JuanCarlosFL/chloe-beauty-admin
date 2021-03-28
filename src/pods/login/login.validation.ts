import { ValidationSchema, Validators } from '@lemoncode/fonk';
import { createFormikValidation } from '@lemoncode/fonk-formik';

const validationSchema: ValidationSchema = {
  field: {
    username: [
      {
        validator: Validators.required.validator,
        message: 'El usuario es obligatorio',
      },
      {
        validator: Validators.email.validator,
        message: 'El usuario debe ser un email válido',
      },
    ],
    password: [
      {
        validator: Validators.required.validator,
        message: 'La contraseña es obligatoria',
      }
    ],
  },
};

export const formValidation = createFormikValidation(validationSchema);
