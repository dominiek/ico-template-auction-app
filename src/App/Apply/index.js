import React from 'react';
import {
  Segment,
  Message,
  Icon
} from 'semantic-ui-react';

import request from 'utils/request';
import PageCenter from 'components/PageCenter';
import LogoTitle from 'components/LogoTitle';
import ApplyForm from './Form';
import { Form } from 'react-final-form';
import { Link } from 'react-router-dom';

export default class Apply extends React.Component {
  state = {
    error: null,
    success: false,
    email: null
  }
  onSubmit = (body) => {
    this.setState({ email: body.email });
    return request({
      method: 'POST',
      path: '/1/applicants/apply',
      body
    }).then(() => {
      this.setState({ success: true });
    }).catch(c => {
      this.setState({ error: c });
    });
  }

  render() {
    const { error, success, email } = this.state;
    return (
      <PageCenter>
        <LogoTitle title="Apply to Whitelist" />
        <Segment.Group>
          <Segment padded>
            { error && (<Message error content={error.message} />) }
            { success ? (
              <Message info>
                <Message.Header>Mail sent!</Message.Header>
                <p>
                  To continue the application process,
                  please follow the instructions in the email we sent to <b>{email}</b>
                </p>
              </Message>
              ) : (
                <Form
                  onSubmit={this.onSubmit}
                  render={ApplyForm}
                />
              )
            }
          </Segment>
          <Segment secondary>
            <Link to="/" style={{ fontSize: '14px' }}>
              <Icon size="small" name="left arrow" />
              Take me back
            </Link>
          </Segment>
        </Segment.Group>
      </PageCenter>
    );
  }
}
