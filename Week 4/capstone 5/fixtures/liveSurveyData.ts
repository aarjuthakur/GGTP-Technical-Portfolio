import type { PageFourData, PageSixData, PageThreeData, PageTwoData } from '../pages/MicrosoftFormsPage';

/* Reusable answers for the PUBLISHED Microsoft Forms survey.*/

export const satisfiedPageTwo: PageTwoData = {
  sourceIndex: 0,
  featureIndexes: [0, 1],
  segment: 'SMB',
  customerSince: '05/01/2024',
  rating: 5,
  nps: 10,
  satisfactionIndex: 0,
};

export const somewhatSatisfiedPageTwo: PageTwoData = {
  ...satisfiedPageTwo,
  rating: 4,
  nps: 9,
  satisfactionIndex: 1,
};

export const dissatisfiedWithHighRatingPageTwo: PageTwoData = {
  ...satisfiedPageTwo,
  rating: 4,
  nps: 9,
  satisfactionIndex: 4,
};

export const neutralPageTwo: PageTwoData = {
  ...satisfiedPageTwo,
  rating: 3,
  nps: 6,
  satisfactionIndex: 2,
};

export const dissatisfiedPageTwo: PageTwoData = {
  ...satisfiedPageTwo,
  rating: 2,
  nps: 4,
  satisfactionIndex: 3,
};

export const veryDissatisfiedPageTwo: PageTwoData = {
  ...satisfiedPageTwo,
  rating: 1,
  nps: 0,
  satisfactionIndex: 4,
};

export const positiveBranch: PageThreeData = {
  likes: 'The clean interface and the detailed reports.',
  bestFeature: 'Reports',
  startedUsing: '05/01/2024',
};

export const improvementBranch: PageFourData = {
  whyNot: 'The dashboard is slow when loading large datasets.',
  improveFirst: 1,
  contactTime: '10:00-12:00',
};

export const preferencesFollowUpYes: PageSixData = {
  likert: [5, 4, 3],
  channelFirst: 1,
  followUpIndex: 0,
  contactMethod: 'Email',
  contactTime: '10:00-12:00',
};

export const preferencesFollowUpNo: PageSixData = {
  likert: [2, 3, 4],
  channelFirst: 1,
  followUpIndex: 1,
};
