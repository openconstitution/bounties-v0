import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './funding.reducer';
import { IFunding } from 'app/shared/model/funding.model';
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
          <Translate contentKey="bountiesApp.funding.detail.title">Funding</Translate> [<b>{fundingEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="amount">
              <Translate contentKey="bountiesApp.funding.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{fundingEntity.amount}</dd>
          <dt>
            <span id="mode">
              <Translate contentKey="bountiesApp.funding.mode">Mode</Translate>
            </span>
          </dt>
          <dd>{fundingEntity.mode}</dd>
          <dt>
            <span id="paymentAuth">
              <Translate contentKey="bountiesApp.funding.paymentAuth">Payment Auth</Translate>
            </span>
          </dt>
          <dd>{fundingEntity.paymentAuth ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="bountiesApp.funding.bounty">Bounty</Translate>
          </dt>
          <dd>{fundingEntity.bounty ? fundingEntity.bounty.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/funding" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/funding/${fundingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
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
