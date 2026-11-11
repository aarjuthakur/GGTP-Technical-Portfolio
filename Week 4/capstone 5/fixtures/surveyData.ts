import { Demographics } from '../pages/PageDemographics';

export const validUser: Demographics = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  company: 'Acme Corp',
  employees: '250',
};

export const validUserTwo: Demographics = {
  name: 'Jane Doe',
  email: 'jane.doe@contoso.com',
  company: 'Contoso Ltd',
  employees: '42',
};

export const productUsage = {
  source: 'Word of mouth',
  features: ['Dashboard', 'Reports'],
} as const;

export const ratingBoundaries = {
  lowest: 1,
  belowThreshold: 3,
  threshold: 4,
  highest: 5,
} as const;

export const npsBoundaries = {
  minimum: 0,
  detractor: 3,
  passiveLow: 6,
  passiveHigh: 7,
  promoter: 9,
  maximum: 10,
} as const;

export const positiveBranchData = {
  likes: 'The clean interface and the detailed reports.',
  bestFeature: 'Reports',
  purchaseDate: '2024-01-15',
} as const;

export const improvementBranchData = {
  whyNot: 'The dashboard is slow when loading large datasets.',
  contactTime: '14:30',
} as const;

export const invalidEmails = [
  'plainaddress',
  'missing-at-sign.com',
  '@no-local-part.com',
  'no-domain@',
] as const;

export const nameBoundaries = {
  tooShort: 'Jo',
  minimum: 'Ana',
  maximum: 'A'.repeat(100),
  tooLong: 'A'.repeat(101),
} as const;
