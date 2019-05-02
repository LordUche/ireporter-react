import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken';
import axios from 'axios';
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

export const uploadMedia = async data => {
  const { Images, Videos } = data;
  const uploads = [...Images, ...Videos].map(file => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.UPLOAD_PRESET);
    formData.append('timestamp', Date.now());

    return axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/upload`,
      formData
    );
  });
  const uploadResponse = uploads.length ? await axios.all(uploads) : [];
  const media = uploadResponse.map(m => ({
    url: m.data.secure_url,
    type: m.data.resource_type,
  }));
  data.Images = media.filter(m => m.type === 'image').map(img => img.url);
  data.Videos = media.filter(m => m.type === 'video').map(vid => vid.url);
};
