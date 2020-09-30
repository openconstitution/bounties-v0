import './bounty.scss';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './bounty.reducer';
import { IBounty } from 'app/shared/model/bounty.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { Segment, Grid, Header, Search, Table, Container, Input, Menu, Icon, Loader, Message, List, Divider, Button } from 'semantic-ui-react';
import _ from 'lodash';
import { TextFormat } from 'react-jhipster';
import { capitalizeFirst } from 'app/shared/util/string-utils';

export interface IBountyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Bounty = (props: IBountyProps) => {

  const [pageSize, setPageSize] = useState(100);
	const [search, setSearch] = useState('');
  const  options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

  useEffect(() => {
    props.getEntities();
  }, []);

  
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

  const tableFooter = (list) => {
    const numPages = list.length / pageSize
    const footNumbers = [];

    for (let i = 1; i <= numPages; i++) {
      footNumbers.push(<Menu.Item as='a'>{i}</Menu.Item>)
    }

    return (
      <Table.Body>    
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='chevron left' />
                </Menu.Item>
                {footNumbers}
                <Menu.Item as='a' icon>
                  <Icon name='chevron right' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table.Body>
    )
  }

  const dispBountyList = (list) => {
    return (
      list.map((bounty, i) => (
        <>
          <Table.Row>
            <Table.Cell>
              <Header as='h4' image>
                <Header.Content>
                  {bounty.summary}
                  <Header.Subheader>Created by {bounty.createdBy} on {bounty.createdDate}</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{capitalizeFirst(bounty.experience)}</Table.Cell>
            <Table.Cell>{capitalizeFirst(bounty.type)}</Table.Cell>
            <Table.Cell>{capitalizeFirst(bounty.status)}</Table.Cell>
            <Table.Cell>{new Date(bounty.expires).toLocaleDateString('en-GB', options)}</Table.Cell>
          </Table.Row>
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
            <Grid.Column>
              <Header icon>
                <Icon name='search' />
                Find Country
              </Header>
              <br/>
              <Input
                action={{ icon: 'search' }}
                onChange={handleSearch}
                onKeyPress={startSearching}
                value={search}
                type='text'
                name="search"
                placeholder='Search bounties...'
              />
            </Grid.Column>

            <Grid.Column>
              <Header icon>
                <Icon name='world' />
                Add New Bounty
              </Header>
              <br/>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <Button primary>Create</Button>
              </Link>
              
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
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
          {dispBountyList(bountyList)}
          {bountyList.length > pageSize && tableFooter(bountyList)}
        </>
        ) : (
          !loading && (
            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="center">
                  <Header as='h4' image>
                    <Header.Content>
                      No Bounties found
                    </Header.Content>
                  </Header>
                </Table.Cell>
              </Table.Row>
          </Table.Body>
          )
        )}
        
      </Table>
		</Segment>
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
