import * as yup from 'yup';
import { propertyListingValidationSchema } from 'validationSchema/property-listings';

export const organizationValidationSchema = yup.object().shape({
  description: yup.string(),
  image: yup.string(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  property_listing: yup.array().of(propertyListingValidationSchema),
});
