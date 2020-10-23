import './bounty.scss';

import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntitiesPerPage as getEntities, reset } from './bounty.reducer';
import { IBounty } from 'app/shared/model/bounty.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { Segment, Grid, Header, Search, Table, Container, Input, Menu, Icon, Loader, Message, List, Divider, Button, Popup, Rating, Pagination } from 'semantic-ui-react';
import _ from 'lodash';
import { TextFormat, getSortState, JhiItemCount, JhiPagination } from 'react-jhipster';
import { capitalizeFirst } from 'app/shared/util/string-utils';
import { Experience } from 'app/shared/model/enumerations/experience.model';
import { Category } from 'app/shared/model/enumerations/category.model';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IBountyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Bounty = (props: IBountyProps) => {

	const [search, setSearch] = useState('');
  const  options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );
  const [bountyActivePage, setBountyActivePage] = useState(paginationState.activePage);

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = (event, { activePage }) => {
    setBountyActivePage(activePage);
    setPaginationState({
      ...paginationState,
      activePage
    });
  }



  // useEffect(() => {
  //   props.getEntities();
  // }, []);


  const startSearching = (event) => {
    const key = event.keyCode || event.which;
    if (key === 13){
      if (search) {
        props.getSearchEntities(search);
      }
    }
  };

  const startSearchingButton = (event) => {
    if (search) {
      props.getSearchEntities(search);
    }
  };

  const clear = () => {
    setSearch('');
    props.getEntities();
  };

  const handleSearch = event => setSearch(event.target.value);

  const getDifficulty = (experience: Experience) => {
    if (experience === Experience.ADVANCED) {
      return 3
    } else if (experience === Experience.INTERMEDIATE) {
      return 2
    } else if (experience === Experience.BEGINNER) {
      return 1
    } else {
      return 0
    }
  }

  const tableFooter = () => {
    return (
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell textAlign='center' colSpan='5'>
            <Pagination
              size='mini'
              boundaryRange={0}
              activePage={bountyActivePage}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
              siblingRange={1}
              onPageChange={handlePagination}
              totalPages={Math.round(props.totalItems / paginationState.itemsPerPage)}
            />
            <br/>
            <JhiItemCount page={paginationState.activePage} total={props.totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    )
  }

  const dispBountyListAlt = (list) => {
    return (
      list.map((bounty, i) => (
        <>
          <Popup
            wide='very'
            position='top center'
            mouseEnterDelay={500}
            mouseLeaveDelay={500}
            trigger={
              <Table.Row>
                <Table.Cell>
                  <a href={`/bounty/${bounty.id}`}>
                    <Header as='h4'>
                      <Header.Content>
                        #BOUNTY-{bounty.id} - {bounty.summary}
                        <Header.Subheader>Created by {bounty.createdBy} {bounty.createdDate === null ? '' : `on ${new Date(bounty.createdDate).toLocaleDateString('en-US', options)}`}</Header.Subheader>
                      </Header.Content>
                    </Header>
                  </a>
                </Table.Cell>
                <Table.Cell>{capitalizeFirst(bounty.experience)}</Table.Cell>
                <Table.Cell>{capitalizeFirst(bounty.type)}</Table.Cell>
                <Table.Cell>{capitalizeFirst(bounty.status)}</Table.Cell>
                <Table.Cell>{new Date(bounty.expiryDate).toLocaleDateString('en-US', options)}</Table.Cell>
              </Table.Row>
            }
          >
            <Header as='h3' content={bounty.summary} />
            <p>{bounty.description !== null ? <i>No description available</i> : bounty.description}</p>
            <span><small>Difficulty: <Rating icon='star' rating={getDifficulty(bounty.experience)} maxRating={3} /></small></span>
            <br/>
            <span><small>Category: {bounty.category === Category.FRONT_END && 'Front End' || bounty.category === Category.BACKEND && 'Backend' || bounty.category === Category.THIS && 'This'}</small></span>
          </Popup>
        </>
      ))
    )
  }

	const { bountyList, match, loading } = props;

  return (
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Segment basic>
        <Grid columns={2} stackable textAlign='center'>
          <Divider vertical>Or</Divider>

          <Grid.Row verticalAlign='middle'>
            <Grid.Column textAlign='center'>
              <Input
                action={{ color: 'teal', content: 'Search' }}
                icon='search'
                iconPosition='left'
                placeholder='Search bounties...'
                onChange={handleSearch}
                onKeyPress={startSearching}
                value={search}
              />
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Link to={`${match.url}/new`}>
                <Button
                  color='teal'
                  content='Create New Bounty'
                  icon='add'
                  labelPosition='left'
                />
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment padded basic>

        <Table selectable={bountyList.length > 0}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width="10"></Table.HeaderCell>
              <Table.HeaderCell width="1">Experience</Table.HeaderCell>
              <Table.HeaderCell width="1">Type</Table.HeaderCell>
              <Table.HeaderCell width="1">Status</Table.HeaderCell>
              <Table.HeaderCell width="2">Expires on</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {bountyList && bountyList.length > 0 ? (
          <>
            {dispBountyListAlt(bountyList)}
            {tableFooter()}
          </>
          ) : (
            !loading && (
              <Table.Body>
                <Table.Row>
                  <Table.Cell textAlign="center">
                    <Header as='h4' image>
                      <Header.Content>
                        No Bounty found
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                </Table.Row>
            </Table.Body>
            )
          )}

        </Table>

      </Segment>
		</Segment>
  );
};

const mapStateToProps = ({ bounty }: IRootState) => ({
  bountyList: bounty.entities,
  loading: bounty.loading,
  links: bounty.links,
  totalItems: bounty.totalItems,
  updateSuccess: bounty.updateSuccess,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Bounty);
