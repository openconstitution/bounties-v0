import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './bounty.reducer';
import { IBounty } from 'app/shared/model/bounty.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBountyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Bounty = (props: IBountyProps) => {
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

  const { bountyList, match, loading } = props;
  return (
    <div>
      <h2 id="bounty-heading">
        <Translate contentKey="bountiesApp.bounty.home.title">Bounties</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="bountiesApp.bounty.home.createLabel">Create new Bounty</Translate>
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
                  placeholder={translate('bountiesApp.bounty.home.search')}
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
        {bountyList && bountyList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="bountiesApp.bounty.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="bountiesApp.bounty.url">Url</Translate>
                </th>
                <th>
                  <Translate contentKey="bountiesApp.bounty.amount">Amount</Translate>
                </th>
                <th>
                  <Translate contentKey="bountiesApp.bounty.experience">Experience</Translate>
                </th>
                <th>
                  <Translate contentKey="bountiesApp.bounty.commitment">Commitment</Translate>
                </th>
                <th>
                  <Translate contentKey="bountiesApp.bounty.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="bountiesApp.bounty.category">Category</Translate>
                </th>
                <th>
                  <Translate contentKey="bountiesApp.bounty.keywords">Keywords</Translate>
                </th>
                <th>
                  <Translate contentKey="bountiesApp.bounty.permission">Permission</Translate>
                </th>
                <th>
                  <Translate contentKey="bountiesApp.bounty.expires">Expires</Translate>
                </th>
                <th>
                  <Translate contentKey="bountiesApp.bounty.issue">Issue</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {bountyList.map((bounty, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${bounty.id}`} color="link" size="sm">
                      {bounty.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`bountiesApp.Status.${bounty.status}`} />
                  </td>
                  <td>{bounty.url}</td>
                  <td>{bounty.amount}</td>
                  <td>
                    <Translate contentKey={`bountiesApp.Experience.${bounty.experience}`} />
                  </td>
                  <td>{bounty.commitment}</td>
                  <td>
                    <Translate contentKey={`bountiesApp.Type.${bounty.type}`} />
                  </td>
                  <td>
                    <Translate contentKey={`bountiesApp.Category.${bounty.category}`} />
                  </td>
                  <td>{bounty.keywords}</td>
                  <td>{bounty.permission ? 'true' : 'false'}</td>
                  <td>{bounty.expires ? <TextFormat type="date" value={bounty.expires} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{bounty.issue ? <Link to={`issue/${bounty.issue.id}`}>{bounty.issue.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${bounty.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bounty.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bounty.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="bountiesApp.bounty.home.notFound">No Bounties found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ bounty }: IRootState) => ({
  bountyList: bounty.entities,
  loading: bounty.loading,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Bounty);
