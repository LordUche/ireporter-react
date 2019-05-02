import axios from 'axios';
import { handleMessages } from '../../utils/helpers';

export const REPORT_INCIDENT_REQUEST = 'REPORT_INCIDENT_REQUEST';
export const REPORT_INCIDENT_SUCCESS = 'REPORT_INCIDENT_SUCCESS';
export const REPORT_INCIDENT_FAILURE = 'REPORT_INCIDENT_FAILURE';

export const reportIncidentRequestAction = () => ({
  type: REPORT_INCIDENT_REQUEST,
});
export const reportIncidentSuccessAction = payload => ({
  type: REPORT_INCIDENT_SUCCESS,
  payload,
});
export const reportIncidentFailureAction = payload => ({
  type: REPORT_INCIDENT_FAILURE,
  payload,
});

export const reportIncident = data => async dispatch => {
  dispatch(reportIncidentRequestAction());

  try {
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

    const uploaded = uploads.length ? await axios.all(uploads) : [];

    const media = uploaded.map(m => ({
      url: m.data.secure_url,
      type: m.data.resource_type,
    }));

    data.Images = media.filter(m => m.type === 'image').map(img => img.url);
    data.Videos = media.filter(m => m.type === 'video').map(vid => vid.url);
    const token = localStorage.getItem('token');
    const res = await axios.post(
      `${process.env.API_BASE_URL}/${data.type}s`,
      { ...data },
      { headers: { 'access-token': token } }
    );
    const { message, ...incident } = res.data.data[0];
    handleMessages([message], 'success');
    dispatch(reportIncidentSuccessAction(incident));
  } catch (err) {
    let messages = ['An error occurred'];

    if (err.response) {
      const { error, errors } = err.response.data;
      messages = errors || [error];
    }
    handleMessages(messages, 'error');
    dispatch(reportIncidentFailureAction(messages));
  }
};
