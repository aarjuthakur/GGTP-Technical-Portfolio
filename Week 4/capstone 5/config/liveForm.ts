/Public responder link - anonymous, no Microsoft sign-in required. */
export const LIVE_FORM_URL =
  'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=Hdc7JPfOLUSzfz_xCj4oMsmOtRlQ2SlKhbNhHCoj8C1UMEVBS0JKMDRKWEE4SUMxM0Q3NUtWNFlTTi4u';

export const LIVE_FORM = {
  url: LIVE_FORM_URL,
  title: 'Customer Satisfaction Survey (Copy)',
  description: '"Tell us about your experience so we can serve you better."',
  totalPages: 6,
  anonymous: true,
} as const;

export const LIVE_SECTIONS = {
  s1: 'Product Usage',
  s2: 'S3A Your Experience',
  s3: 'S3B Help Us Improve',
  s4: 'Recommendation',
  s5: 'Preferences & Follow-up',
} as const;

/Question titles exactly as the responder sees them (ordinal is rendered separately)/
export const LIVE_Q = {
  fullName: 'What is your full name?',
  email: 'What is your email address?',
  company: 'What is your company name?',
  employees: 'How many employees work in your organization?',
  source: 'How did you hear about us?',
  features: 'Which features do you use?',
  segment: 'What is your customer segment?',
  customerSince: 'When did you become a customer?',
  rating: 'Rate your overall experience',
  nps: 'How likely are you to recommend us to a friend or colleague?',
  satisfaction: 'Overall, how satisfied are you with us?',
  likes: 'What do you like most about our product?',
  bestFeature: 'Which feature do you value the most?',
  startedUsing: 'When did you start using our product?',
  whyNot: 'Why are you not fully satisfied?',
  improveRank: 'Rank what we should improve first',
  contactTimePositive: 'What is the best time to contact you?',
  recommendColleague: 'How likely are you to recommend us to a colleague?',
  caseStudy: 'Would you be interested in being featured in a customer case study?',
  makeTen: 'What would make us a 10 for you?',
  issue: 'Please describe the issue',
  likert: 'I am satisfied with the product and service quality',
  channelRank: 'Rank our communication channels',
  followUp: 'Would you like us to follow up with you?',
  contactMethod: 'What is your preferred contact method?',
  contactTime: 'What is the best time to contact you?',
} as const;

export const LIVE_CHOICES = {
  source: ['Word of mouth', 'Online search', 'Social media', 'Referral', 'Email newsletter'],
  features: ['Dashboard', 'Price Calculator', 'Online Shopping', 'Coupon Collection'],
  segment: ['Enterprise', 'SMB', 'Startup', 'Individual'],
  satisfaction: [
    'Very satisfied',
    'Somewhat satisfied',
    'Neither satisfied nor dissatisfied',
    'Somewhat dissatisfied',
    'Very dissatisfied',
  ],
  bestFeature: ['Dashboard', 'Reports', 'Automation', 'Integrations', 'Mobile app', 'Customer support'],
  timeSlots: ['08:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00'],
  recommendColleague: ['Very likely', 'Somewhat likely', 'Neither likely nor unlikely', 'Somewhat unlikely', 'Very unlikely'],
  caseStudy: ['Yes', 'No', 'Maybe'],
  followUp: ['Yes', 'No', 'Maybe'],
  contactMethod: ['Email', 'Phone', 'Microsoft Teams'],
} as const;

export const LIVE_RANKING = {
  improve: ['Ease of use', 'Performance and speed', 'Customer support', 'Pricing', 'Integrations'],
  channels: ['Email', 'Phone', 'Microsoft Teams', 'In-app chat'],
} as const;

export function choiceIndex(choices: readonly string[], label: string): number {
  const index = choices.indexOf(label);
  if (index < 0) {
    throw new Error(`Unknown choice "${label}". Known options: ${choices.join(', ')}`);
  }
  return index;
}

export const LIVE_BRANCHES = {
  satisfactionPositive: {
    question: LIVE_Q.satisfaction,
    answers: [0, 1],
    target: LIVE_SECTIONS.s2,
    status: 'works' as const,
  },
  satisfactionNegative: {
    question: LIVE_Q.satisfaction,
    answers: [2, 3, 4],
    target: LIVE_SECTIONS.s3,
    status: 'broken' as const,
    defect: 'DEF-004',
  },
  npsPromoter: {
    question: LIVE_Q.recommendColleague,
    answers: [0, 1],
    target: LIVE_Q.makeTen,
    status: 'broken' as const,
    defect: 'DEF-005',
  },
  followUpYes: {
    question: LIVE_Q.followUp,
    answers: [0],
    target: LIVE_Q.contactMethod,
    status: 'works' as const,
  },
  followUpNo: {
    question: LIVE_Q.followUp,
    answers: [1],
    target: 'END OF FORM',
    status: 'works' as const,
  },
} as const;

export const LIVE_VALIDATION = {
  name: { question: LIVE_Q.fullName, rule: 'min-length', min: 3 },
  email: { question: LIVE_Q.email, rule: 'email' },
  employees: { question: LIVE_Q.employees, rule: 'number' },
  likes: { question: LIVE_Q.likes, rule: 'max-length' },
} as const;

export const UPLOAD_FORM_URL =
  'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=Hdc7JPfOLUSzfz_xCj4oMsmOtRlQ2SlKhbNhHCoj8C1URUQ0STFNVlU1STMwME5FV1RYVUROUDhBTS4u';

export const UPLOAD_FORM = {
  url: UPLOAD_FORM_URL,
  anonymous: false,
  requiresSignIn: true,
  acceptedFileTypes: ['image/*', '.pdf'],
  maxFileSizeBytes: 10 * 1024 * 1024,
  signInHost: 'login.microsoftonline.com',
  coverage: 'manual (TC-042)',
} as const;
