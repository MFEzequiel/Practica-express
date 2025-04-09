import z, { string } from 'zod'

const controllersScheme = z.object({
  name: z
    .string({
      invalid_type_error: 'name must be a string',
      required_error: 'Name is required.'
    })
    .min(1, 'El nombre es requrido'),
  username: z
    .string({
      invalid_type_error: 'name must be a string',
      required_error: 'Username is required.'
    })
    .min(2, 'El ombre de usuario debe ser de almenos 3 caracteres'),
  email: z.string({
    invalid_type_error: 'name must be a string',
    required_error: 'Email is required.'
  }),
  password: z
    .string({
      invalid_type_error: 'name must be a string',
      required_error: 'Password is required.'
    })
    .min(5, 'La contraseña debe ser de 6 caracteres')
})

const contScheme = z.object({
  username: z.string({
    invalid_type_error: 'name must be a string',
    required_error: 'Userame is required.'
  }),
  password: z.string({
    invalid_type_error: 'name must be a string',
    required_error: 'Password is required.'
  })
})

export function validateAllFields (object) {
  return controllersScheme.safeParseAsync(object)
}

export function validateFields (object) {
  return contScheme.safeParseAsync(object)
}
