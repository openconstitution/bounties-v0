import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './issue.reducer';
import { IIssue } from 'app/shared/model/issue.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIssueDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const IssueDetail = (props: IIssueDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { issueEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="bountiesApp.issue.detail.title">Issue</Translate> [<b>{issueEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="issueId">
              <Translate contentKey="bountiesApp.issue.issueId">Issue Id</Translate>
            </span>
          </dt>
          <dd>{issueEntity.issueId}</dd>
          <dt>
            <span id="url">
              <Translate contentKey="bountiesApp.issue.url">Url</Translate>
            </span>
          </dt>
          <dd>{issueEntity.url}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="bountiesApp.issue.description">Description</Translate>
            </span>
          </dt>
          <dd>{issueEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/issue" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/issue/${issueEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ issue }: IRootState) => ({
  issueEntity: issue.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IssueDetail);
