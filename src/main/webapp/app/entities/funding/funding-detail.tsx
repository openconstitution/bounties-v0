import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './fund.reducer';
import { IFunding } from 'app/shared/model/fund.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

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
            <span id="amount">Amount</span>
          </dt>
          <dd>{fundingEntity.amount}</dd>
          <dt>
            <span id="mode">Mode</span>
          </dt>
          <dd>{fundingEntity.mode}</dd>
          <dt>
            <span id="paymentAuth">Payment Auth</span>
          </dt>
          <dd>{fundingEntity.paymentAuth ? 'true' : 'false'}</dd>
          <dt>Bounty</dt>
          <dd>{fundingEntity.bounty ? fundingEntity.bounty.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/fund" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/fund/${fundingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ fund }: IRootState) => ({
  fundingEntity: fund.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FundingDetail);
