import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBounty } from 'app/shared/model/bounty.model';
import { getEntities as getBounties } from 'app/entities/bounty/bounty.reducer';
import { getEntity, updateEntity, createEntity, reset } from './fund.reducer';
import { IFunding } from 'app/shared/model/fund.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFundingUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FundingUpdate = (props: IFundingUpdateProps) => {
  const [bountyId, setBountyId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { fundingEntity, bounties, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/fund');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getBounties();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...fundingEntity,
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
          <h2 id="bountiesApp.fund.home.createOrEditLabel">Create or edit a Funding</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : fundingEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="fund-id">ID</Label>
                  <AvInput id="fund-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="amountLabel" for="fund-amount">
                  Amount
                </Label>
                <AvField id="fund-amount" type="text" name="amount" />
              </AvGroup>
              <AvGroup>
                <Label id="modeLabel" for="fund-mode">
                  Mode
                </Label>
                <AvField id="fund-mode" type="text" name="mode" />
              </AvGroup>
              <AvGroup check>
                <Label id="paymentAuthLabel">
                  <AvInput id="fund-paymentAuth" type="checkbox" className="form-check-input" name="paymentAuth" />
                  Payment Auth
                </Label>
              </AvGroup>
              <AvGroup>
                <Label for="fund-bounty">Bounty</Label>
                <AvInput id="fund-bounty" type="select" className="form-control" name="bounty.id">
                  <option value="" key="0" />
                  {bounties
                    ? bounties.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/fund" replace color="info">
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
  bounties: storeState.bounty.entities,
  fundingEntity: storeState.fund.entity,
  loading: storeState.fund.loading,
  updating: storeState.fund.updating,
  updateSuccess: storeState.fund.updateSuccess,
});

const mapDispatchToProps = {
  getBounties,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FundingUpdate);
