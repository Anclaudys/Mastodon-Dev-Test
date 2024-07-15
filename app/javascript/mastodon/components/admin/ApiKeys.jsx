import React, { useState, useEffect } from 'react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { Button } from '../../../mastodon/components/button';
import TextInput from '../../../mastodon/components/TextInput';
import { connect } from 'react-redux';
import { fetchApiKeys, createApiKey, updateApiKey, deleteApiKey } from '../../../mastodon/actions/server';

const messages = defineMessages({
  labelName: { id: 'api_key_form.label_name', defaultMessage: 'API Key Name' },
  placeholderName: { id: 'api_key_form.placeholder_name', defaultMessage: 'Enter API key name' },
  labelOtp: { id: 'api_key_form.label_otp', defaultMessage: 'OTP Secret' },
  placeholderOtp: { id: 'api_key_form.placeholder_otp', defaultMessage: 'Enter OTP key' },
  labelSecret: { id: 'api_key_form.label_secret', defaultMessage: 'Secret Key' },
  placeholderSecret: { id: 'api_key_form.placeholder_secret', defaultMessage: 'Enter secret key' },
  submit: { id: 'api_key_form.submit', defaultMessage: 'Submit' },
  update: { id: 'api_key_form.update', defaultMessage: 'Update API Key' },
  cancel: { id: 'api_key_form.cancel', defaultMessage: 'Cancel' },
  edit: { id: 'api_key_form.edit', defaultMessage: 'Edit' },
  delete: { id: 'api_key_form.delete', defaultMessage: 'Delete' },
  noKeys: { id: 'api_keys.no_keys', defaultMessage: 'No API keys available.' },
});

const ApiKeys = ({ apiKeys, fetchApiKeys, createApiKey, updateApiKey, deleteApiKey }) => {
  const [name, setName] = useState('');
  const [otpSecret, setOtpSecret] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [editingKey, setEditingKey] = useState(null);
  const intl = useIntl();

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeOtp = (e) => setOtpSecret(e.target.value);
  const handleChangeSecret = (e) => setSecretKey(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingKey) {
      updateApiKey(editingKey.id, { name, otpSecret, secretKey });
      setEditingKey(null);
    } else {
      createApiKey({ name, otpSecret, secretKey });
    }
    setName('');
    setOtpSecret('');
    setSecretKey('');
  };

  const handleEdit = (key) => {
    setEditingKey(key);
    setName(key.name);
    setOtpSecret(key.otpSecret || '');
    setSecretKey(key.secretKey || '');
  };

  const handleDelete = (id) => {
    deleteApiKey(id);
  };

  const renderSubmitButton = () => {
    if (editingKey) {
      return <FormattedMessage {...messages.update} />;
    }
    return <FormattedMessage {...messages.submit} />;
  };

  return (
  <div>
    <form onSubmit={handleSubmit} className="api-key-form">
      <div className="input-group">
        <label className="form-label">
          <FormattedMessage {...messages.labelName} />&nbsp;
        </label>
        <TextInput
          value={name}
          placeholder={intl.formatMessage(messages.placeholderName)}
          onChange={handleChangeName}
        />
      </div>
      <div className="input-group">
        <label className="form-label">
          <FormattedMessage {...messages.labelOtp} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </label>
        <TextInput
          value={otpSecret}
          placeholder={intl.formatMessage(messages.placeholderOtp)}
          onChange={handleChangeOtp}
        />
      </div>
      <div className="input-group">
        <label className="form-label">
          <FormattedMessage {...messages.labelSecret} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </label>
        <TextInput
          value={secretKey}
          placeholder={intl.formatMessage(messages.placeholderSecret)}
          onChange={handleChangeSecret}
        />
      </div>
      <div className="button-container">
        <Button 
          disabled={!name || !otpSecret || !secretKey} 
          type='submit'
          className="small-button"
        >
          {renderSubmitButton()}
        </Button>
        {editingKey && (
          <Button 
            onClick={() => { setEditingKey(null); setName(''); setOtpSecret(''); setSecretKey(''); }}
            className="small-button"
          >
            <FormattedMessage {...messages.cancel} />
          </Button>
        )}
      </div>
    </form>

    {Array.isArray(apiKeys) && apiKeys.length > 0 ? (
      <ul>
        {apiKeys.map(key => (
          <li key={key.id}>
            {key.name}
            <Button onClick={() => handleEdit(key)}>
              <FormattedMessage {...messages.edit} />
            </Button>
            <Button onClick={() => handleDelete(key.id)}>
              <FormattedMessage {...messages.delete} />
            </Button>
          </li>
        ))}
      </ul>
    ) : (
      <p><FormattedMessage {...messages.noKeys} /></p>
    )}
  </div>

  );
};
const mapStateToProps = (state) => ({
  apiKeys: state.getIn(['server', 'apiKeys', 'items']),
});

const mapDispatchToProps = {
  fetchApiKeys,
  createApiKey,
  updateApiKey,
  deleteApiKey,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApiKeys);