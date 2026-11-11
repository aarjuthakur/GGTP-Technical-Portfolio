export const SURVEY = {
  title: 'Customer Satisfaction Survey',
  totalPages: 6,
  thankYou: {
    recorded: 'Your response has been recorded',
    contact: "We'll contact you soon.",
    feedback: 'Thank you for your feedback.',
  },
} as const;

export const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 820, height: 1180 },
  mobile: { width: 390, height: 844 },
} as const;

export const FILE_RULES = {
  maxSizeMb: 10,
  allowedExtensions: ['.png', '.jpg', '.jpeg', '.gif', '.pdf'],
} as const;
