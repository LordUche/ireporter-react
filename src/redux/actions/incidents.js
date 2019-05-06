import axios from 'axios';
import { uploadMedia } from '../../utils/helpers';
import * as types from './types';

const token = localStorage.getItem('token');

const incidentRequestAction = () => ({
  type: types.INCIDENTS_REQUEST,
});
const incidentResultAction = (type, payload) => ({ type, payload });

export const get = (type, id, history) => async dispatch => {
  try {
    const res = await axios.get(`${process.env.API_BASE_URL}/${type}s/${id}`, {
      headers: { 'access-token': token },
    });
    dispatch(incidentResultAction(types.INCIDENTS_SUCCESS, res.data.data[0]));
    history.push(`/incidents/${id}`);
  } catch (err) {
    let messages;
    if (err.response) {
      const { error, errors } = err.response.data;
      messages = errors || [error];
    }
    dispatch(incidentResultAction(types.INCIDENTS_FAILURE, messages));
  }
};

export const getAll = type => async dispatch => {
  const baseUrl = `${process.env.API_BASE_URL}/${type}s`;
  dispatch(incidentRequestAction());
  try {
    const res = await axios.get(baseUrl, {
      headers: { 'access-token': token },
    });
    dispatch(
      incidentResultAction(types.INCIDENTS_SUCCESS, { [type]: res.data.data })
    );
  } catch (err) {
    let messages;
    if (err.response) {
      const { error, errors } = err.response.data;
      messages = errors || [error];
    }
    dispatch(incidentResultAction(types.INCIDENTS_FAILURE, messages));
  }
};

export const report = (data, history) => async dispatch => {
  const baseUrl = `${process.env.API_BASE_URL}/${data.type}s`;
  dispatch(incidentRequestAction());
  try {
    await uploadMedia(data);
    const res = await axios.post(
      baseUrl,
      { ...data },
      { headers: { 'access-token': token } }
    );
    dispatch(get(data.type, res.data.data[0].id, history));
  } catch (err) {
    let messages;
    if (err.response) {
      const { error, errors } = err.response.data;
      messages = errors || [error];
    }
    dispatch(incidentResultAction(types.INCIDENTS_FAILURE, messages));
  }
};
