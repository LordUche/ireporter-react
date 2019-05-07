import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken';
import axios from 'axios';

export const showToast = (messages = [], type = 'info') => {
  messages.map(message => toast[type](message));
};

export const handleMessages = (messages = [], type = 'info') => {
  window.dispatchEvent(
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

export const getIncidentStats = (incidents = [], status = '') =>
  incidents.reduce((acc, i) => (i.status === status ? acc + 1 : acc), 0);

export const getErrorMessages = err => {
  let messages;
  if (err.response) {
    const { error, errors } = err.response.data;
    messages = errors || [error];
  } else messages = ['An error occurred'];
  handleMessages(messages, 'error');
  return messages;
};

export const mapKeys = array =>
  array.reduce((acc, i) => ({ ...acc, [i.id]: i }), {});

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
