import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IIssue } from 'app/shared/model/issue.model';
import { getEntities as getIssues } from 'app/entities/issue/issue.reducer';
import { getEntity, updateEntity, createEntity, reset } from './bounties.reducer';
import { IBounties } from 'app/shared/model/bounties.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBountiesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BountiesUpdate = (props: IBountiesUpdateProps) => {
  const [issueId, setIssueId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { bountiesEntity, issues, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/bounties');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getIssues();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...bountiesEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="bountiesApp.bounties.home.createOrEditLabel">Create or edit a Bounties</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : bountiesEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="bounties-id">ID</Label>
                  <AvInput id="bounties-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="statusLabel" for="bounties-status">
                  Status
                </Label>
                <AvInput
                  id="bounties-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && bountiesEntity.status) || 'OPEN'}
                >
                  <option value="OPEN">OPEN</option>
                  <option value="INVALID">INVALID</option>
                  <option value="CLOSED">CLOSED</option>
                  <option value="FUNDED">FUNDED</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="urlLabel" for="bounties-url">
                  Url
                </Label>
                <AvField id="bounties-url" type="text" name="url" />
              </AvGroup>
              <AvGroup>
                <Label id="amountLabel" for="bounties-amount">
                  Amount
                </Label>
                <AvField id="bounties-amount" type="text" name="amount" />
              </AvGroup>
              <AvGroup>
                <Label id="experienceLabel" for="bounties-experience">
                  Experience
                </Label>
                <AvInput
                  id="bounties-experience"
                  type="select"
                  className="form-control"
                  name="experience"
                  value={(!isNew && bountiesEntity.experience) || 'BEGINNER'}
                >
                  <option value="BEGINNER">BEGINNER</option>
                  <option value="INTERMEDIATE">INTERMEDIATE</option>
                  <option value="ADVANCED">ADVANCED</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="commitmentLabel" for="bounties-commitment">
                  Commitment
                </Label>
                <AvField id="bounties-commitment" type="string" className="form-control" name="commitment" />
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="bounties-type">
                  Type
                </Label>
                <AvInput
                  id="bounties-type"
                  type="select"
                  className="form-control"
                  name="type"
                  value={(!isNew && bountiesEntity.type) || 'BUG'}
                >
                  <option value="BUG">BUG</option>
                  <option value="FEATURE">FEATURE</option>
                  <option value="IMPROVEMENT">IMPROVEMENT</option>
                  <option value="EX">EX</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="categoryLabel" for="bounties-category">
                  Category
                </Label>
                <AvInput
                  id="bounties-category"
                  type="select"
                  className="form-control"
                  name="category"
                  value={(!isNew && bountiesEntity.category) || 'FRONT_END'}
                >
                  <option value="FRONT_END">FRONT_END</option>
                  <option value="BACKEND">BACKEND</option>
                  <option value="THIS">THIS</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="keywordsLabel" for="bounties-keywords">
                  Keywords
                </Label>
                <AvField id="bounties-keywords" type="text" name="keywords" />
              </AvGroup>
              <AvGroup check>
                <Label id="permissionLabel">
                  <AvInput id="bounties-permission" type="checkbox" className="form-check-input" name="permission" />
                  Permission
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="expiresLabel" for="bounties-expires">
                  Expires
                </Label>
                <AvField id="bounties-expires" type="date" className="form-control" name="expires" />
              </AvGroup>
              <AvGroup>
                <Label for="bounties-issue">Issue</Label>
                <AvInput id="bounties-issue" type="select" className="form-control" name="issue.id">
                  <option value="" key="0" />
                  {issues
                    ? issues.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/bounties" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  issues: storeState.issue.entities,
  bountiesEntity: storeState.bounties.entity,
  loading: storeState.bounties.loading,
  updating: storeState.bounties.updating,
  updateSuccess: storeState.bounties.updateSuccess,
});

const mapDispatchToProps = {
  getIssues,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BountiesUpdate);
