export const BASE_URL = 'https://automationexercise.com';
export const TIMEOUT = 30000;
export const NAV_TIMEOUT = 5000;
export const ELEMENT_TIMEOUT = 10000;

export const TEST_CREDENTIALS = {
  email: 'newuser1101@example.com',
  password: 'New@user11',
  firstName: 'New',
  lastName: 'user1',
};

export const generateUniqueEmail = (): string => {
  const timestamp = Date.now();
  return `testuser_${timestamp}@test.com`;
};
