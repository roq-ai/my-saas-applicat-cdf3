import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { propertyListingValidationSchema } from 'validationSchema/property-listings';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.property_listing
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPropertyListingById();
    case 'PUT':
      return updatePropertyListingById();
    case 'DELETE':
      return deletePropertyListingById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPropertyListingById() {
    const data = await prisma.property_listing.findFirst(convertQueryToPrismaUtil(req.query, 'property_listing'));
    return res.status(200).json(data);
  }

  async function updatePropertyListingById() {
    await propertyListingValidationSchema.validate(req.body);
    const data = await prisma.property_listing.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePropertyListingById() {
    const data = await prisma.property_listing.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
