import api from '../api';

import { importFetchedAccount } from './importer';

export const SERVER_FETCH_REQUEST = 'Server_FETCH_REQUEST';
export const SERVER_FETCH_SUCCESS = 'Server_FETCH_SUCCESS';
export const SERVER_FETCH_FAIL    = 'Server_FETCH_FAIL';

export const SERVER_TRANSLATION_LANGUAGES_FETCH_REQUEST = 'SERVER_TRANSLATION_LANGUAGES_FETCH_REQUEST';
export const SERVER_TRANSLATION_LANGUAGES_FETCH_SUCCESS = 'SERVER_TRANSLATION_LANGUAGES_FETCH_SUCCESS';
export const SERVER_TRANSLATION_LANGUAGES_FETCH_FAIL    = 'SERVER_TRANSLATION_LANGUAGES_FETCH_FAIL';

export const EXTENDED_DESCRIPTION_REQUEST = 'EXTENDED_DESCRIPTION_REQUEST';
export const EXTENDED_DESCRIPTION_SUCCESS = 'EXTENDED_DESCRIPTION_SUCCESS';
export const EXTENDED_DESCRIPTION_FAIL    = 'EXTENDED_DESCRIPTION_FAIL';

export const SERVER_DOMAIN_BLOCKS_FETCH_REQUEST = 'SERVER_DOMAIN_BLOCKS_FETCH_REQUEST';
export const SERVER_DOMAIN_BLOCKS_FETCH_SUCCESS = 'SERVER_DOMAIN_BLOCKS_FETCH_SUCCESS';
export const SERVER_DOMAIN_BLOCKS_FETCH_FAIL    = 'SERVER_DOMAIN_BLOCKS_FETCH_FAIL';

export const API_KEYS_FETCH_REQUEST = 'API_KEYS_FETCH_REQUEST';
export const API_KEYS_FETCH_SUCCESS = 'API_KEYS_FETCH_SUCCESS';
export const API_KEYS_FETCH_FAIL = 'API_KEYS_FETCH_FAIL';
export const API_KEY_CREATE_REQUEST = 'API_KEY_CREATE_REQUEST';
export const API_KEY_CREATE_SUCCESS = 'API_KEY_CREATE_SUCCESS';
export const API_KEY_CREATE_FAIL = 'API_KEY_CREATE_FAIL';
export const API_KEY_UPDATE_REQUEST = 'API_KEY_UPDATE_REQUEST';
export const API_KEY_UPDATE_SUCCESS = 'API_KEY_UPDATE_SUCCESS';
export const API_KEY_UPDATE_FAIL = 'API_KEY_UPDATE_FAIL';
export const API_KEY_DELETE_REQUEST = 'API_KEY_DELETE_REQUEST';
export const API_KEY_DELETE_SUCCESS = 'API_KEY_DELETE_SUCCESS';
export const API_KEY_DELETE_FAIL = 'API_KEY_DELETE_FAIL';

export const fetchServer = () => (dispatch, getState) => {
  if (getState().getIn(['server', 'server', 'isLoading'])) {
    return;
  }

  dispatch(fetchServerRequest());

  api(getState)
    .get('/api/v2/instance').then(({ data }) => {
      if (data.contact.account) dispatch(importFetchedAccount(data.contact.account));
      dispatch(fetchServerSuccess(data));
    }).catch(err => dispatch(fetchServerFail(err)));
};

const fetchServerRequest = () => ({
  type: SERVER_FETCH_REQUEST,
});

const fetchServerSuccess = server => ({
  type: SERVER_FETCH_SUCCESS,
  server,
});

const fetchServerFail = error => ({
  type: SERVER_FETCH_FAIL,
  error,
});

export const fetchServerTranslationLanguages = () => (dispatch, getState) => {
  dispatch(fetchServerTranslationLanguagesRequest());

  api(getState)
    .get('/api/v1/instance/translation_languages').then(({ data }) => {
      dispatch(fetchServerTranslationLanguagesSuccess(data));
    }).catch(err => dispatch(fetchServerTranslationLanguagesFail(err)));
};

const fetchServerTranslationLanguagesRequest = () => ({
  type: SERVER_TRANSLATION_LANGUAGES_FETCH_REQUEST,
});

const fetchServerTranslationLanguagesSuccess = translationLanguages => ({
  type: SERVER_TRANSLATION_LANGUAGES_FETCH_SUCCESS,
  translationLanguages,
});

const fetchServerTranslationLanguagesFail = error => ({
  type: SERVER_TRANSLATION_LANGUAGES_FETCH_FAIL,
  error,
});

export const fetchExtendedDescription = () => (dispatch, getState) => {
  if (getState().getIn(['server', 'extendedDescription', 'isLoading'])) {
    return;
  }

  dispatch(fetchExtendedDescriptionRequest());

  api(getState)
    .get('/api/v1/instance/extended_description')
    .then(({ data }) => dispatch(fetchExtendedDescriptionSuccess(data)))
    .catch(err => dispatch(fetchExtendedDescriptionFail(err)));
};

const fetchExtendedDescriptionRequest = () => ({
  type: EXTENDED_DESCRIPTION_REQUEST,
});

const fetchExtendedDescriptionSuccess = description => ({
  type: EXTENDED_DESCRIPTION_SUCCESS,
  description,
});

const fetchExtendedDescriptionFail = error => ({
  type: EXTENDED_DESCRIPTION_FAIL,
  error,
});

export const fetchDomainBlocks = () => (dispatch, getState) => {
  if (getState().getIn(['server', 'domainBlocks', 'isLoading'])) {
    return;
  }

  dispatch(fetchDomainBlocksRequest());

  api(getState)
    .get('/api/v1/instance/domain_blocks')
    .then(({ data }) => dispatch(fetchDomainBlocksSuccess(true, data)))
    .catch(err => {
      if (err.response.status === 404) {
        dispatch(fetchDomainBlocksSuccess(false, []));
      } else {
        dispatch(fetchDomainBlocksFail(err));
      }
    });
};

const fetchDomainBlocksRequest = () => ({
  type: SERVER_DOMAIN_BLOCKS_FETCH_REQUEST,
});

const fetchDomainBlocksSuccess = (isAvailable, blocks) => ({
  type: SERVER_DOMAIN_BLOCKS_FETCH_SUCCESS,
  isAvailable,
  blocks,
});

const fetchDomainBlocksFail = error => ({
  type: SERVER_DOMAIN_BLOCKS_FETCH_FAIL,
  error,
});


// API KEYS ACTIONS

export const fetchApiKeys = () => (dispatch, getState) => {
  dispatch(fetchApiKeysRequest());

  api(getState)
    .get('/admin/api_keys')
    .then(({ data }) => dispatch(fetchApiKeysSuccess(data)))
    .catch(err => dispatch(fetchApiKeysFail(err)));
};

const fetchApiKeysRequest = () => ({
  type: API_KEYS_FETCH_REQUEST,
});

const fetchApiKeysSuccess = apiKeys => ({
  type: API_KEYS_FETCH_SUCCESS,
  apiKeys,
});

const fetchApiKeysFail = error => ({
  type: API_KEYS_FETCH_FAIL,
  error,
});

// Create API Key
export const createApiKey = ({name, otpSecret, secretKey}) => (dispatch, getState) => {
  dispatch(createApiKeyRequest());
  
  const payload = { api_key: { name, otp_secret: otpSecret, secret_key: secretKey } };
  console.log("Payload being sent:", payload);

  api(getState)
    .post('/admin/api_keys', payload)
    .then(({ data }) => dispatch(createApiKeySuccess(data)))
    .catch(err => dispatch(createApiKeyFail(err)));
};

const createApiKeyRequest = () => ({
  type: API_KEY_CREATE_REQUEST,
});

const createApiKeySuccess = apiKey => ({
  type: API_KEY_CREATE_SUCCESS,
  apiKey,
});

const createApiKeyFail = error => ({
  type: API_KEY_CREATE_FAIL,
  error,
});

// Update API Key
export const updateApiKey = (id, data) => (dispatch, getState) => {
  dispatch(updateApiKeyRequest());

  api(getState)
    .put(`/admin/api_keys/${id}`, { api_key: data })
    .then(({ data }) => dispatch(updateApiKeySuccess(id, data)))
    .catch(err => dispatch(updateApiKeyFail(err)));
};

const updateApiKeyRequest = () => ({
  type: API_KEY_UPDATE_REQUEST,
});

const updateApiKeySuccess = (id, apiKey) => ({
  type: API_KEY_UPDATE_SUCCESS,
  id,
  apiKey,
});

const updateApiKeyFail = error => ({
  type: API_KEY_UPDATE_FAIL,
  error,
});

// Delete API Key
export const deleteApiKey = (id) => (dispatch, getState) => {
  dispatch(deleteApiKeyRequest());

  api(getState)
    .delete(`/admin/api_keys/${id}`)
    .then(() => dispatch(deleteApiKeySuccess(id)))
    .catch(err => dispatch(deleteApiKeyFail(err)));
};

const deleteApiKeyRequest = () => ({
  type: API_KEY_DELETE_REQUEST,
});

const deleteApiKeySuccess = id => ({
  type: API_KEY_DELETE_SUCCESS,
  id,
});

const deleteApiKeyFail = error => ({
  type: API_KEY_DELETE_FAIL,
  error,
});
