/* eslint-disable consistent-return */
import axios from 'axios';
import { handleMessages, uploadMedia } from '../../utils/helpers';

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
  const invalidIncidentTypeMsg = 'Please select a type of incident';

  try {
    if (!data.type) throw new Error(invalidIncidentTypeMsg);

    const token = localStorage.getItem('token');

    await uploadMedia(data);

    const res = await axios.post(
      `${process.env.API_BASE_URL}/${data.type}s`,
      { ...data },
      { headers: { 'access-token': token } }
    );
    const { message, ...incident } = res.data.data[0];

    handleMessages([message], 'success');
    dispatch(reportIncidentSuccessAction(incident));
  } catch (err) {
    let messages =
      err.message === invalidIncidentTypeMsg
        ? [err.message]
        : ['An error occurred'];

    if (err.response) {
      const { error, errors } = err.response.data;
      messages = errors || [error];
    }
    handleMessages(messages, 'error');
    dispatch(reportIncidentFailureAction(messages));
  }
};
