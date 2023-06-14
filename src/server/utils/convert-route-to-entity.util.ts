const mapping: Record<string, string> = {
  organizations: 'organization',
  'property-listings': 'property_listing',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
