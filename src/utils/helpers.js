import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken';
import { appRef } from './refs';

export const showToast = (messages = [], type = 'info') => {
  messages.map(message => toast[type](message));
};

export const handleMessages = (messages = [], type = 'info') => {
  appRef.current &&
    appRef.current.dispatchEvent(
      new CustomEvent('app-message', {
        bubbles: true,
        detail: {
          messages,
          type,
        },
      })
    );
};

export const sanitizeData = data =>
  Object.keys(data).reduce(
    (fields, field) =>
      data[field].trim() === ''
        ? fields
        : { ...fields, [field]: data[field].trim() },
    {}
  );

export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem('token');
    const decoded = jwt.decode(token);
    return Date.now() / 1000 > decoded.exp ? false : decoded;
  } catch (error) {
    return null;
  }
};
