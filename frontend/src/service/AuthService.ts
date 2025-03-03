import { IUser } from '../interface/IUser';

const getUser = (): IUser|null|undefined => {
  const user = sessionStorage.getItem('user');
  if (user === 'undefined' || !user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

const getToken = (): string|null => {
  return sessionStorage.getItem('token');
};

const setUserSession = (user: IUser, token: string): void => {
  sessionStorage.setItem('user', JSON.stringify(user));
  sessionStorage.setItem('token', token);
};

const resetUserSession = (): void => {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('token');
};


export { getUser, getToken, setUserSession, resetUserSession };