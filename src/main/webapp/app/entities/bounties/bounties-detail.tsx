import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './bounties.reducer';
import { IBounties } from 'app/shared/model/bounties.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBountiesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BountiesDetail = (props: IBountiesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { bountiesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Bounties [<b>{bountiesEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{bountiesEntity.status}</dd>
          <dt>
            <span id="url">Url</span>
          </dt>
          <dd>{bountiesEntity.url}</dd>
          <dt>
            <span id="amount">Amount</span>
          </dt>
          <dd>{bountiesEntity.amount}</dd>
          <dt>
            <span id="experience">Experience</span>
          </dt>
          <dd>{bountiesEntity.experience}</dd>
          <dt>
            <span id="commitment">Commitment</span>
          </dt>
          <dd>{bountiesEntity.commitment}</dd>
          <dt>
            <span id="type">Type</span>
          </dt>
          <dd>{bountiesEntity.type}</dd>
          <dt>
            <span id="category">Category</span>
          </dt>
          <dd>{bountiesEntity.category}</dd>
          <dt>
            <span id="keywords">Keywords</span>
          </dt>
          <dd>{bountiesEntity.keywords}</dd>
          <dt>
            <span id="permission">Permission</span>
          </dt>
          <dd>{bountiesEntity.permission ? 'true' : 'false'}</dd>
          <dt>
            <span id="expires">Expires</span>
          </dt>
          <dd>
            {bountiesEntity.expires ? <TextFormat value={bountiesEntity.expires} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>Issue</dt>
          <dd>{bountiesEntity.issue ? bountiesEntity.issue.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/bounties" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/bounties/${bountiesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ bounties }: IRootState) => ({
  bountiesEntity: bounties.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BountiesDetail);
