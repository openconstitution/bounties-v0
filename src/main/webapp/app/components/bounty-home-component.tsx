import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { getSortState, JhiItemCount } from 'react-jhipster';
import { Link, RouteComponentProps } from 'react-router-dom';

import { createMedia } from '@artsy/fresnel';
import { Category } from 'app/shared/model/enumerations/category.model';
import { Experience } from 'app/shared/model/enumerations/experience.model';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { capitalizeFirst } from 'app/shared/util/string-utils';
import { Button, Divider, Grid, Header, Input, List, Pagination, Rating, Segment, Table } from 'semantic-ui-react';
import { APP_DATETIME_FORMAT } from 'app/config/constants';

export interface IBountyHomeComponentProps extends RouteComponentProps {
	bountyList: any,
  loading: any,
  links: any,
  totalItems: any,
  updateSuccess: any,
  getSearchEntities: any,
  getEntities: any,
  reset: any,
}

const { MediaContextProvider, Media } = createMedia({
	breakpoints: {
		mobile: 0,
		tablet: 768,
		computer: 1024,
	},
})

export const BountyHomeComponent = (props: IBountyHomeComponentProps) => {
  
	const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );
  const [bountyActivePage, setBountyActivePage] = useState(paginationState.activePage);

  const getAllEntities = () => {
		const pageable = {
			page: paginationState.activePage - 1,
			size: paginationState.itemsPerPage,
			sort: `${paginationState.sort},${paginationState.order}`}
    props.getEntities(pageable);
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
      alert(search);
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

  const TableFooter = () => {
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
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore: No overload matches this call
              onPageChange={handlePagination}
              totalPages={Math.round(props.totalItems / paginationState.itemsPerPage)}
            />
            <br/><br/>
            <JhiItemCount page={paginationState.activePage} total={props.totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    )
  }

  const DesktopBountyTable = () => {
    return (
      props.bountyList.map((bounty, i) => (
        <>	
					<ReactTooltip id='bounty-tooltip' aria-haspopup='true' type='info'>
						<Header as='h3' content={bounty.summary} />
						<p>{bounty.description !== null ? <i>No description available</i> : bounty.description}</p>
						<span><small>Difficulty: <Rating icon='star' rating={getDifficulty(bounty.experience)} maxRating={3} /></small></span>
						<br/>
						<span>
							<small>Category: {bounty.category === Category.FRONT_END && 'Front End' || bounty.category === Category.BACKEND && 'Backend' || bounty.category === Category.THIS && 'This'}</small>
						</span>
					</ReactTooltip>

					<Table.Row data-tip data-for='bounty-tooltip'>
						<Table.Cell>
							<a href={`/${bounty.id}`}>
								<Header as='h4'>
									<Header.Content>
										#{bounty.id} - {bounty.summary}
										<Header.Subheader>Created by {bounty.createdBy} {bounty.createdDate === null ? '' : `on ${new Date(bounty.createdDate).toLocaleDateString('en-US', APP_DATETIME_FORMAT)}`}</Header.Subheader>
									</Header.Content>
								</Header>
							</a>
						</Table.Cell>
						<Table.Cell>{capitalizeFirst(bounty.experience)}</Table.Cell>
						<Table.Cell>{capitalizeFirst(bounty.type)}</Table.Cell>
						<Table.Cell>{capitalizeFirst(bounty.status)}</Table.Cell>
						<Table.Cell>{new Date(bounty.expiryDate).toLocaleDateString('en-US', APP_DATETIME_FORMAT)}</Table.Cell>
					</Table.Row>
							
        </>
      ))
    )
	}
	
	const MobileBountyTable = () => {
    return (
      props.bountyList.map((bounty, i) => (
        <>
					<Table.Row>
						<Table.Cell>
							<a href={`/${bounty.id}`}>
								<Header as='h4'>
									<Header.Content>
										#{bounty.id} - {bounty.summary}
										<Header.Subheader>
											<span>
												<List bulleted horizontal size='tiny'>
													<List.Item>
														Created by {bounty.createdBy}
													</List.Item>
													<List.Item>
														on {bounty.createdDate === null ? '' : `${new Date(bounty.createdDate).toLocaleDateString('en-US', APP_DATETIME_FORMAT)}`}
													</List.Item>
													<List.Item>
														Expires on {new Date(bounty.expiryDate).toLocaleDateString('en-US', APP_DATETIME_FORMAT)}
													</List.Item>
												</List>
											</span>
										</Header.Subheader>
									</Header.Content>									
								</Header>
								<div>

									<p>{bounty.description !== null ? <i>No description available</i> : bounty.description}</p>
									<span><small>Difficulty: <Rating icon='star' rating={getDifficulty(bounty.experience)} maxRating={3} /></small></span>
									<br/>
									<span><small>Category: {bounty.category === Category.FRONT_END && 'Front End' || bounty.category === Category.BACKEND && 'Backend' || bounty.category === Category.THIS && 'This'}</small></span>
									<br/>
									
								</div>
							</a>
						</Table.Cell>
					</Table.Row>
        </>
      ))
    )
  }

	const { bountyList, loading } = props;

  return (		
		<MediaContextProvider>
			<Media greaterThan='mobile'>
				<Segment basic vertical style={{ padding: '5em 5em' }}>
					<Grid container stackable verticalAlign='middle'>
						<Grid.Row>
							<Grid.Column width={16}>
								<Segment basic>
									<Grid columns={2} stackable textAlign='center'>
										<Divider vertical>Or</Divider>

										<Grid.Row verticalAlign='middle'>
											<Grid.Column textAlign='center'>
												<Input
													action={<Button color='teal' content='search' onClick={startSearchingButton} />}
													icon='search'
													iconPosition='left'
													placeholder='Search bounties...'
													onChange={handleSearch}
													onKeyPress={startSearching}
													value={search}
												/>
											</Grid.Column>
											<Grid.Column textAlign='center'>
												<Link to={`/new`}>
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
									<Table color='black' selectable={bountyList.length > 0}>
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
											<DesktopBountyTable/>
											<TableFooter/>
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
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
			</Media>

			<Media at='mobile'>
				<Segment basic vertical>
					<Grid container stackable verticalAlign='middle'>
						<Grid.Row>
							<Grid.Column width={16}>
								<Table celled color='black' selectable={bountyList.length > 0}>
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell>
												<Input
													fluid
													action={<Button color='teal' content='search' onClick={startSearchingButton} />}
													icon='search'
													iconPosition='left'
													placeholder='Search bounties...'
													onChange={handleSearch}
													onKeyPress={startSearching}
													value={search}
												/>
											</Table.HeaderCell>
										</Table.Row>
									</Table.Header>

									{bountyList && bountyList.length > 0 ? (
									<>
										<MobileBountyTable/>
										<TableFooter/>
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
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
			</Media>
		</MediaContextProvider>
  );
};

export default BountyHomeComponent;
