import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './issue.reducer';
import { IIssue } from 'app/shared/model/issue.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IIssueUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const IssueUpdate = (props: IIssueUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { issueEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/issue');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...issueEntity,
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
          <h2 id="bountiesApp.issue.home.createOrEditLabel">
            <Translate contentKey="bountiesApp.issue.home.createOrEditLabel">Create or edit a Issue</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : issueEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="issue-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="issue-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="issueIdLabel" for="issue-issueId">
                  <Translate contentKey="bountiesApp.issue.issueId">Issue Id</Translate>
                </Label>
                <AvField id="issue-issueId" type="text" name="issueId" />
              </AvGroup>
              <AvGroup>
                <Label id="urlLabel" for="issue-url">
                  <Translate contentKey="bountiesApp.issue.url">Url</Translate>
                </Label>
                <AvField id="issue-url" type="text" name="url" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="issue-description">
                  <Translate contentKey="bountiesApp.issue.description">Description</Translate>
                </Label>
                <AvField id="issue-description" type="text" name="description" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/issue" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  issueEntity: storeState.issue.entity,
  loading: storeState.issue.loading,
  updating: storeState.issue.updating,
  updateSuccess: storeState.issue.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IssueUpdate);
