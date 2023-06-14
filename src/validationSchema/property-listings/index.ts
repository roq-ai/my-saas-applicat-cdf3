import * as yup from 'yup';

export const propertyListingValidationSchema = yup.object().shape({
  title: yup.string().required(),
  address: yup.string().required(),
  price: yup.number().integer().required(),
  organization_id: yup.string().nullable().required(),
});
