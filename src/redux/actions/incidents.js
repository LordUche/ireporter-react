import axios from 'axios';
import { uploadMedia, getErrorMessages } from '../../utils/helpers';
import * as types from './types';

const apiBaseUrl = `${process.env.API_BASE_URL}`;

// ACTIONS

export const loadIncidents = () => ({
  type: types.LOAD_INCIDENTS,
});

export const updateStore = (type, payload) => ({ type, payload });

// CREATORS

export const get = (type, id) => async dispatch => {
  dispatch(loadIncidents());
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${apiBaseUrl}/${type}/${id}`, {
      headers: { 'access-token': token },
    });
    dispatch(updateStore(types.FETCH_INCIDENT, res.data.data[0]));
  } catch (err) {
    dispatch(updateStore(types.INCIDENT_ERROR, getErrorMessages(err)));
  }
};

export const getAll = () => async dispatch => {
  dispatch(loadIncidents());
  try {
    const token = localStorage.getItem('token');
    const requests = ['red-flags', 'interventions'].map(type =>
      axios.get(`${apiBaseUrl}/${type}`, { headers: { 'access-token': token } })
    );
    const res = await axios.all(requests);
    const incidents = res.reduce(
      (acc, response) => [...acc, ...response.data.data],
      []
    );
    dispatch(updateStore(types.FETCH_INCIDENTS, incidents));
  } catch (err) {
    dispatch(updateStore(types.INCIDENT_ERROR, getErrorMessages(err)));
  }
};

export const report = data => async dispatch => {
  const baseUrl = `${apiBaseUrl}/${data.type}s`;
  dispatch(loadIncidents());
  try {
    await uploadMedia(data);
    const token = localStorage.getItem('token');
    const {
      data: {
        data: [incident],
      },
    } = await axios.post(baseUrl, data, {
      headers: { 'access-token': token },
    });
    await dispatch(get(`${data.type}s`, incident.id));
    dispatch(updateStore(types.CREATE_INCIDENT, { id: incident.id }));
  } catch (err) {
    dispatch(updateStore(types.INCIDENT_ERROR, getErrorMessages(err)));
  }
};

export const deleteIncident = (type, id) => async dispatch => {
  dispatch(loadIncidents());
  try {
    const token = localStorage.getItem('token');
    const res = await axios.delete(`${apiBaseUrl}/${type}s/${id}`, {
      headers: { 'access-token': token },
    });
    dispatch(updateStore(types.DELETE_INCIDENT, res.data.data[0]));
  } catch (err) {
    dispatch(updateStore(types.INCIDENT_ERROR, getErrorMessages(err)));
  }
};
