// app/javascript/mastodon/components/admin/ApiKeys.jsx
import React from 'react';

const ApiKeys = ({ apiKeys, newApiKey }) => {
  return (
    <div>
      <h2>API Keys</h2>
      <ul>
        {apiKeys.map((key) => (
          <li key={key.id}>{key.name}</li>
        ))}
      </ul>
      <button onClick={() => console.log(newApiKey)}>Add New API Key</button>
    </div>
  );
};

export default ApiKeys;