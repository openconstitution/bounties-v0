import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './profile.reducer';
import { IProfile } from 'app/shared/model/profile.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProfileProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Profile = (props: IProfileProps) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    props.getEntities();
  }, []);

  const startSearching = () => {
    if (search) {
      props.getSearchEntities(search);
    }
  };

  const clear = () => {
    setSearch('');
    props.getEntities();
  };

  const handleSearch = event => setSearch(event.target.value);

  const { profileList, match, loading } = props;
  return (
    <div>
      <h2 id="profile-heading">
        <Translate contentKey="bountiesApp.profile.home.title">Profiles</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="bountiesApp.profile.home.createLabel">Create new Profile</Translate>
        </Link>
      </h2>
      <Row>
        <Col sm="12">
          <AvForm onSubmit={startSearching}>
            <AvGroup>
              <InputGroup>
                <AvInput
                  type="text"
                  name="search"
                  value={search}
                  onChange={handleSearch}
                  placeholder={translate('bountiesApp.profile.home.search')}
                />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search" />
                </Button>
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </InputGroup>
            </AvGroup>
          </AvForm>
        </Col>
      </Row>
      <div className="table-responsive">
        {profileList && profileList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="bountiesApp.profile.votes">Votes</Translate>
                </th>
                <th>
                  <Translate contentKey="bountiesApp.profile.profilelink">Profilelink</Translate>
                </th>
                <th>
                  <Translate contentKey="bountiesApp.profile.about">About</Translate>
                </th>
                <th>
                  <Translate contentKey="bountiesApp.profile.walletaddress">Walletaddress</Translate>
                </th>
                <th>
                  <Translate contentKey="bountiesApp.profile.githubEmail">Github Email</Translate>
                </th>
                <th>
                  <Translate contentKey="bountiesApp.profile.githubOrgName">Github Org Name</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {profileList.map((profile, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${profile.id}`} color="link" size="sm">
                      {profile.id}
                    </Button>
                  </td>
                  <td>{profile.votes}</td>
                  <td>{profile.profilelink}</td>
                  <td>{profile.about}</td>
                  <td>{profile.walletaddress}</td>
                  <td>{profile.githubEmail}</td>
                  <td>{profile.githubOrgName}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${profile.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${profile.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${profile.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="bountiesApp.profile.home.notFound">No Profiles found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ profile }: IRootState) => ({
  profileList: profile.entities,
  loading: profile.loading,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
