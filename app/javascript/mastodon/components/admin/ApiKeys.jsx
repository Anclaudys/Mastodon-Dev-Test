import React, { useState, useEffect } from 'react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { Button } from '../../../mastodon/components/button';
import TextInput from '../../../mastodon/components/TextInput';
import { connect } from 'react-redux';
import { fetchApiKeys, createApiKey, updateApiKey, deleteApiKey } from '../../../mastodon/actions/server';

const messages = defineMessages({
  label: { id: 'api_key_form.label', defaultMessage: 'API Key Name' },
  placeholder: { id: 'api_key_form.placeholder', defaultMessage: 'Enter API key name' },
  submit: { id: 'api_key_form.submit', defaultMessage: 'Create API Key' },
  update: { id: 'api_key_form.update', defaultMessage: 'Update API Key' },
  cancel: { id: 'api_key_form.cancel', defaultMessage: 'Cancel' },
  edit: { id: 'api_key_form.edit', defaultMessage: 'Edit' },
  delete: { id: 'api_key_form.delete', defaultMessage: 'Delete' },
  noKeys: { id: 'api_keys.no_keys', defaultMessage: 'No API keys available.' },
});

const ApiKeys = ({ apiKeys, fetchApiKeys, createApiKey, updateApiKey, deleteApiKey }) => {
  const [value, setValue] = useState('');
  const [editingKey, setEditingKey] = useState(null);
  const intl = useIntl();

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingKey) {
      updateApiKey(editingKey.id, { name: value });
      setEditingKey(null);
    } else {
      createApiKey(value);
    }
    setValue('');
  };

  const handleEdit = (key) => {
    setEditingKey(key);
    setValue(key.name);
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
      <form onSubmit={handleSubmit}>
        <label>
          <FormattedMessage {...messages.label} />
          <TextInput
            value={value}
            placeholder={intl.formatMessage(messages.placeholder)}
            onChange={handleChange}
          />
        </label>
        <Button disabled={!value} type='submit'>
          {renderSubmitButton()}
        </Button>
        {editingKey && (
          <Button onClick={() => { setEditingKey(null); setValue(''); }}>
            <FormattedMessage {...messages.cancel} />
          </Button>
        )}
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