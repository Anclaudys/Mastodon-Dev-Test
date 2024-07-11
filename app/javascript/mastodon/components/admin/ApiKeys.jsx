

import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import ImmutablePureComponent from 'react-immutable-pure-component';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Button } from '../../../mastodon/components/button';
import TextInput from '../../../mastodon/components/TextInput';

const messages = defineMessages({
  placeholder: { id: 'api_key_form.placeholder', defaultMessage: 'Enter API key name' },
  submit: { id: 'api_key_form.submit', defaultMessage: 'Create AI Key' },
});

class ApiKeyForm extends ImmutablePureComponent {

  static propTypes = {
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    intl: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  handleChange = (e) => {
    this.props.onChange(e.target.value);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.props.value);
  }

  render() {
    const { value, disabled, intl } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <FormattedMessage id='api_key_form.label' defaultMessage='API Key Name' />
          <TextInput
            value={value}
            disabled={disabled}
            placeholder={intl.formatMessage(messages.placeholder)}
            onChange={this.handleChange}
          />
        </label>
        <Button disabled={disabled || !value} type='submit'>
          <FormattedMessage {...messages.submit} />
        </Button>
      </form>
    );
  }

}

const mapStateToProps = (state) => ({
  value: state.getIn(['api_keys', 'new', 'value']),
  disabled: state.getIn(['api_keys', 'new', 'submitting']),
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (value) => dispatch({ type: 'API_KEY_CHANGE', value }),
  onSubmit: (value) => dispatch({ type: 'API_KEY_SUBMIT', value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ApiKeyForm));