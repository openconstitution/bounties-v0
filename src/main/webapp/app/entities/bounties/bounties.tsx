import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './bounties.reducer';
import { IBounties } from 'app/shared/model/bounties.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBountiesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Bounties = (props: IBountiesProps) => {
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

  const { bountiesList, match, loading } = props;
  return (
    <div>
      <h2 id="bounties-heading">
        Bounties
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Bounties
        </Link>
      </h2>
      <Row>
        <Col sm="12">
          <AvForm onSubmit={startSearching}>
            <AvGroup>
              <InputGroup>
                <AvInput type="text" name="search" value={search} onChange={handleSearch} placeholder="Search" />
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
        {bountiesList && bountiesList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Url</th>
                <th>Amount</th>
                <th>Experience</th>
                <th>Commitment</th>
                <th>Type</th>
                <th>Category</th>
                <th>Keywords</th>
                <th>Permission</th>
                <th>Expires</th>
                <th>Issue</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {bountiesList.map((bounties, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${bounties.id}`} color="link" size="sm">
                      {bounties.id}
                    </Button>
                  </td>
                  <td>{bounties.status}</td>
                  <td>{bounties.url}</td>
                  <td>{bounties.amount}</td>
                  <td>{bounties.experience}</td>
                  <td>{bounties.commitment}</td>
                  <td>{bounties.type}</td>
                  <td>{bounties.category}</td>
                  <td>{bounties.keywords}</td>
                  <td>{bounties.permission ? 'true' : 'false'}</td>
                  <td>{bounties.expires ? <TextFormat type="date" value={bounties.expires} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{bounties.issue ? <Link to={`issue/${bounties.issue.id}`}>{bounties.issue.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${bounties.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bounties.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bounties.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Bounties found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ bounties }: IRootState) => ({
  bountiesList: bounties.entities,
  loading: bounties.loading,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Bounties);
