import i18n from '../i18n';

export const createAuthError = (message = 'auth.sessionExpired') => {
  return {
    message: i18n.t(message),
    isAuthError: true // Flag to identify auth errors
  };
};
