import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './profile.reducer';
import { IProfile } from 'app/shared/model/profile.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProfileDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProfileDetail = (props: IProfileDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { profileEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Profile [<b>{profileEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="votes">Votes</span>
          </dt>
          <dd>{profileEntity.votes}</dd>
          <dt>
            <span id="profilelink">Profilelink</span>
          </dt>
          <dd>{profileEntity.profilelink}</dd>
          <dt>
            <span id="about">About</span>
          </dt>
          <dd>{profileEntity.about}</dd>
          <dt>
            <span id="walletaddress">Walletaddress</span>
          </dt>
          <dd>{profileEntity.walletaddress}</dd>
          <dt>
            <span id="githubEmail">Github Email</span>
          </dt>
          <dd>{profileEntity.githubEmail}</dd>
          <dt>
            <span id="githubOrgName">Github Org Name</span>
          </dt>
          <dd>{profileEntity.githubOrgName}</dd>
        </dl>
        <Button tag={Link} to="/profile" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/profile/${profileEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ profile }: IRootState) => ({
  profileEntity: profile.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetail);
