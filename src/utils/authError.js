export const createAuthError = (message = 'Session expired. Please logout and Login again.') => {
  return {
    message,
    isAuthError: true // Flag to identify auth errors
  };
};