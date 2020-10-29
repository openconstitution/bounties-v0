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
import { getEntity, updateEntity, createEntity, reset } from './bounty.reducer';
import { IBounty } from 'app/shared/model/bounty.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBountyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BountyUpdate = (props: IBountyUpdateProps) => {
  const [issueId, setIssueId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { bountyEntity, issues, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/bounty');
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
        ...bountyEntity,
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
          <h2 id="bountiesApp.bounty.home.createOrEditLabel">Create or edit a Bounty</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : bountyEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="bounty-id">ID</Label>
                  <AvInput id="bounty-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="statusLabel" for="bounty-status">
                  Status
                </Label>
                <AvInput
                  id="bounty-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && bountyEntity.status) || 'OPEN'}
                >
                  <option value="OPEN">OPEN</option>
                  <option value="INVALID">INVALID</option>
                  <option value="CLOSED">CLOSED</option>
                  <option value="FUNDED">FUNDED</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="urlLabel" for="bounty-url">
                  Url
                </Label>
                <AvField id="bounty-url" type="text" name="url" />
              </AvGroup>
              <AvGroup>
                <Label id="amountLabel" for="bounty-amount">
                  Amount
                </Label>
                <AvField id="bounty-amount" type="text" name="amount" />
              </AvGroup>
              <AvGroup>
                <Label id="experienceLabel" for="bounty-experience">
                  Experience
                </Label>
                <AvInput
                  id="bounty-experience"
                  type="select"
                  className="form-control"
                  name="experience"
                  value={(!isNew && bountyEntity.experience) || 'BEGINNER'}
                >
                  <option value="BEGINNER">BEGINNER</option>
                  <option value="INTERMEDIATE">INTERMEDIATE</option>
                  <option value="ADVANCED">ADVANCED</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="commitmentLabel" for="bounty-commitment">
                  Commitment
                </Label>
                <AvField id="bounty-commitment" type="string" className="form-control" name="commitment" />
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="bounty-type">
                  Type
                </Label>
                <AvInput id="bounty-type" type="select" className="form-control" name="type" value={(!isNew && bountyEntity.type) || 'BUG'}>
                  <option value="BUG">BUG</option>
                  <option value="FEATURE">FEATURE</option>
                  <option value="IMPROVEMENT">IMPROVEMENT</option>
                  <option value="EX">EX</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="categoryLabel" for="bounty-category">
                  Category
                </Label>
                <AvInput
                  id="bounty-category"
                  type="select"
                  className="form-control"
                  name="category"
                  value={(!isNew && bountyEntity.category) || 'FRONT_END'}
                >
                  <option value="FRONT_END">FRONT_END</option>
                  <option value="BACKEND">BACKEND</option>
                  <option value="THIS">THIS</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="keywordsLabel" for="bounty-keywords">
                  Keywords
                </Label>
                <AvField id="bounty-keywords" type="text" name="keywords" />
              </AvGroup>
              <AvGroup check>
                <Label id="permissionLabel">
                  <AvInput id="bounty-permission" type="checkbox" className="form-check-input" name="permission" />
                  Permission
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="expiresLabel" for="bounty-expires">
                  Expires
                </Label>
                <AvField id="bounty-expires" type="date" className="form-control" name="expires" />
              </AvGroup>
              <AvGroup>
                <Label for="bounty-issue">Issue</Label>
                <AvInput id="bounty-issue" type="select" className="form-control" name="issue.id">
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
              <Button tag={Link} id="cancel-save" to="/bounty" replace color="info">
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
  bountyEntity: storeState.bounty.entity,
  loading: storeState.bounty.loading,
  updating: storeState.bounty.updating,
  updateSuccess: storeState.bounty.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(BountyUpdate);
