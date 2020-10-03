import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './bounty.reducer';
import { IBounty } from 'app/shared/model/bounty.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBountyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BountyDetail = (props: IBountyDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { bountyEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Bounty [<b>{bountyEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="status">
              Statuses
            </span>
          </dt>
          <dd>{bountyEntity.status}</dd>
          <dt>
            <span id="url">
              Url
            </span>
          </dt>
          <dd>{bountyEntity.url}</dd>
          <dt>
            <span id="amount">
              Amount
            </span>
          </dt>
          <dd>{bountyEntity.amount}</dd>
          <dt>
            <span id="experience">
              Experience
            </span>
          </dt>
          <dd>{bountyEntity.experience}</dd>
          <dt>
            <span id="commitment">
              Commitment
            </span>
          </dt>
          <dd>{bountyEntity.commitment}</dd>
          <dt>
            <span id="type">
              Type
            </span>
          </dt>
          <dd>{bountyEntity.type}</dd>
          <dt>
            <span id="category">
              Category
            </span>
          </dt>
          <dd>{bountyEntity.category}</dd>
          <dt>
            <span id="keywords">
              Keywords
            </span>
          </dt>
          <dd>{bountyEntity.keywords}</dd>
          <dt>
            <span id="permission">
              Permission
            </span>
          </dt>
          <dd>{bountyEntity.permission ? 'true' : 'false'}</dd>
          <dt>
            <span id="expires">
              Expires
            </span>
          </dt>
          <dd>{bountyEntity.expires ? <TextFormat value={bountyEntity.expires} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            Issue
          </dt>
          <dd>{bountyEntity.issue ? bountyEntity.issue.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/bounty" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            Back
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/bounty/${bountyEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            Edit
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ bounty }: IRootState) => ({
  bountyEntity: bounty.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BountyDetail);
