import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './funding.reducer';

export interface IFundingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FundingDetail = (props: IFundingDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { fundingEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Funding [<b>{fundingEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="amount">
              Amount
            </span>
          </dt>
          <dd>{fundingEntity.amount}</dd>
          <dt>
            <span id="mode">
              Mode
            </span>
          </dt>
          <dd>{fundingEntity.mode}</dd>
          <dt>
            <span id="paymentAuth">
              Payment Auth
            </span>
          </dt>
          <dd>{fundingEntity.paymentAuth ? 'true' : 'false'}</dd>
          <dt>
            Bounty
          </dt>
          <dd>{fundingEntity.bounty ? fundingEntity.bounty.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/funding" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            Back
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/funding/${fundingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            Edit
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ funding }: IRootState) => ({
  fundingEntity: funding.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FundingDetail);
