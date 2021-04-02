import { ValidationSchema, Validators } from '@lemoncode/fonk';
import { createFormikValidation } from '@lemoncode/fonk-formik';

const validationSchema: ValidationSchema = {
  field: {
    Email: [
      {
        validator: Validators.required.validator,
        message: 'El campo email es obligatorio',
      },
      {
        validator: Validators.email.validator,
        message: 'El usuario debe ser un email válido',
      },
    ],
    Surname: [
      {
        validator: Validators.required.validator,
        message: 'La contraseña es obligatoria',
      },
    ],
    Name: [
      {
        validator: Validators.required.validator,
        message: 'La contraseña es obligatoria',
      },
    ],
  },
};

export const formValidation = createFormikValidation(validationSchema);
