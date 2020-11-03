import React, { useEffect } from 'react';
import { Button, Col, Alert, Row } from 'reactstrap';
import { connect } from 'react-redux';

import { AvForm, AvField } from 'availity-reactstrap-validation';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { saveAccountSettings, reset } from './settings.reducer';
import { RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IUserSettingsProps extends StateProps, DispatchProps, RouteComponentProps {}

export const SettingsPage = (props: IUserSettingsProps) => {
  useEffect(() => {
    props.getSession();
    return () => {
      props.reset();
    };
  }, []);

  const handleValidSubmit = (event, values) => {
    const account = {
      ...props.account,
      ...values,
    };

    props.saveAccountSettings(account);
    event.persist();
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="settings-title">User settings for {props.account.login}</h2>
          <AvForm id="settings-form" onValidSubmit={handleValidSubmit}>
            {/* Surname */}
            <AvField
              className="form-control"
              name="surname"
              label="Surname"
              id="surname"
              placeholder="Your surname"
              validate={{
                required: { value: true, errorMessage: 'Your surname is required.' },
                minLength: { value: 1, errorMessage: 'Your surname is required to be at least 1 character' },
                maxLength: { value: 50, errorMessage: 'Your surname cannot be longer than 50 characters' },
              }}
              value={props.account.surname}
            />
            {/* Maiden name */}
            <AvField
              className="form-control"
              name="maidenName"
              label="Maiden Name"
              id="maidenName"
              placeholder="Your Maiden name"
              validate={{
                required: { value: true, errorMessage: 'Your Maiden name is required.' },
                minLength: { value: 1, errorMessage: 'Your Maiden name is required to be at least 1 character' },
                maxLength: { value: 50, errorMessage: 'Your Maiden name cannot be longer than 50 characters' },
              }}
              value={props.account.maidenName}
            />
            {/* Other names */}
            <AvField
              className="form-control"
              name="otherNames"
              label="Other Name"
              id="otherNames"
              placeholder="Your Other name"
              validate={{
                required: { value: true, errorMessage: 'Your Other name is required.' },
                minLength: { value: 1, errorMessage: 'Your Other name is required to be at least 1 character' },
                maxLength: { value: 50, errorMessage: 'Your Other name cannot be longer than 50 characters' },
              }}
              value={props.account.otherNames}
            />
            {/* Email */}
            <AvField
              name="email"
              label="Email"
              placeholder={'Your email'}
              type="email"
              validate={{
                required: { value: true, errorMessage: 'Your email is required.' },
                minLength: { value: 5, errorMessage: 'Your email is required to be at least 5 characters.' },
                maxLength: { value: 254, errorMessage: 'Your email cannot be longer than 50 characters.' },
              }}
              value={props.account.email}
            />
            
            <Button onClick={props.history.goBack}>
              <FontAwesomeIcon icon="arrow-left" />
              &nbsp;
              <span className="d-none d-md-inline">Back</span>
            </Button>
            &nbsp;
            <Button color="primary" type="submit">
              <FontAwesomeIcon icon="save" />
              &nbsp; Save
            </Button>
          </AvForm>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
});

const mapDispatchToProps = { getSession, saveAccountSettings, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
