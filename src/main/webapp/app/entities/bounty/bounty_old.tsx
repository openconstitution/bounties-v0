import './bounty.scss';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './bounty.reducer';
import { IBounty } from 'app/shared/model/bounty.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { Segment, Grid, Divider, Header, Icon, Search, Button } from 'semantic-ui-react';

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

    {/* <Paper square elevation={0} className={classes.contentContainer}>
      <div className={classes.instructions}>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={snackBarOpen}
          autoHideDuration={3000}
          onClose={handleSnackBarClose}>
          <Alert onClose={handleSnackBarClose} severity="error">
            Please fill in the fields with an asterisk(*)!
          </Alert>
        </Snackbar>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
                <Container text>
                  <Typography variant="h3">
                    <IconButton onClick={handleReset} className={classes.button}>
                      <ReplayIcon />
                    </IconButton>
                    Bounty Summary
                  </Typography>
                  <List
                    disablePadding
                    component="nav"
                    className={classes.instructions}
                    aria-labelledby="nested-list-subheader"
                  >
                    <ListItem onClick={handleBountyClick}>
                      <ListItemText primary="Bounty Details" />
                      {bountyOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={bountyOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItem className={classes.nested}>
                          <ListItemText secondary={"Bounty URL: ".concat(bountyUrl)} />
                        </ListItem>
                        <ListItem className={classes.nested}>
                          <ListItemText secondary={"Type: ".concat(
                            (type.toLowerCase().replace('_', ' ')).charAt(0).toUpperCase() + (type.toLowerCase().replace('_', ' ')).slice(1)
                          )} />
                        </ListItem>
                        <ListItem className={classes.nested}>
                          <ListItemText secondary={"Category: ".concat(
                            (category.toLowerCase().replace('_', ' ')).charAt(0).toUpperCase() + (category.toLowerCase().replace('_', ' ')).slice(1)
                          )} />
                        </ListItem>
                        <ListItem className={classes.nested}>
                          <ListItemText secondary={"Experience: ".concat(
                            (experience.toLowerCase().replace('_', ' ')).charAt(0).toUpperCase() + (experience.toLowerCase().replace('_', ' ')).slice(1)
                          )} />
                        </ListItem>

                        <ListItem className={classes.nested} onClick={handleIssueClick}>
                          <ListItemText primary="Issue Details" />
                          {issueOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={issueOpen} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItem className={classes.subNested}>
                              <ListItemText secondary={"Issue url: ".concat(issueUrl)} />
                            </ListItem>
                            <ListItem className={classes.subNested}>
                              <ListItemText secondary={"Description: ".concat(description)} />
                            </ListItem>
                          </List>
                        </Collapse>
                        <ListItem className={classes.nested} onClick={handleFundingClick}>
                          <ListItemText primary="Fundind Details" />
                          {fundingOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={fundingOpen} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItem className={classes.subNested}>
                              <ListItemText secondary={"Amount: ".concat(amount)} />
                            </ListItem>
                            <ListItem className={classes.subNested}>
                              <ListItemText secondary={"Mode: ".concat(mode)} />
                            </ListItem>
                          </List>
                        </Collapse>
                      </List>
                    </Collapse>
                  </List>
                  <Button variant="contained" secondary onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="contained" primary onClick={submit}>
                    Submit
                  </Button>
                </Container>
          ) : (
            <div>
              <Container text>
                {activeStep === 0 ? (
                  <Segment basic>
                    <Grid columns={2} divided relaxed='very'>
                      <Grid.Column verticalAlign='middle'>
                        <p>Issue Details</p>
                      </Grid.Column>
                      <Grid.Column textAlign='left' verticalAlign='middle'>
                        <Form>
                          <Form.Field
                            required
                            control={Input}
                            name='url'
                            label='Issue Url'
                            value={issueUrl}
                            placeholder='Issue url'
                            onChange={handleIssueUrlChange}
                            error={isEmpty ? "Please enter a value" : false}
                          />
                          <Form.Field
                            control={TextArea}
                            name='description'
                            label='Description'
                            value={description}
                            placeholder='Tell us more about this issue...'
                            onChange={handleDescriptionChange}
                          />
                        </Form>
                      </Grid.Column>
                    </Grid>
                  </Segment>
                ) : activeStep === 1 ? (
                  <Segment basic>
                    <Grid columns={2} divided relaxed='very'>
                      <Grid.Column verticalAlign='middle'>
                        <p>Funding Details</p>
                      </Grid.Column>
                      <Grid.Column textAlign='left' verticalAlign='middle'>
                        <Form>
                          <Form.Field
                            required
                            control={Input}
                            type="number"
                            icon='dollar'
                            iconPosition='left'
                            name='amount'
                            label='Amount'
                            value={amount}
                            placeholder='amount'
                            onChange={handleAmountChange}
                            error={isEmpty ? "Please enter a value" : false}
                          />
                          <Form.Group inline>
                            <label>Mode</label>
                            <Form.Field
                              control={BRadio}
                              label='One'
                              value='1'
                              checked={mode === '1'}
                              onChange={handleModeChange}
                            />
                            <Form.Field
                              control={BRadio}
                              label='Two'
                              value='2'
                              checked={mode === '2'}
                              onChange={handleModeChange}
                            />
                            <Form.Field
                              control={BRadio}
                              label='Three'
                              value='3'
                              checked={mode === '3'}
                              onChange={handleModeChange}
                            />
                          </Form.Group>
                        </Form>
                        <br/>
                      </Grid.Column>
                    </Grid>
                  </Segment>
                ) : activeStep === 2 ? (
                  <Segment basic>
                    <Grid columns={2} divided relaxed='very'>
                      <Grid.Column verticalAlign='middle'>
                        <p>Bounty Details</p>
                      </Grid.Column>
                      <Grid.Column textAlign='left' verticalAlign='middle'>
                        <Form>
                          <Form.Select
                            fluid
                            required
                            name='category'
                            label='Category'
                            value={category}
                            options={categories}
                            placeholder='Category'
                            onChange={handleCategoryChange}
                            error={isEmpty ? "Please choose a value" : false}
                          />
                          <Form.Select
                            fluid
                            required
                            name='type'
                            label='Type'
                            value={type}
                            options={types}
                            placeholder='Type'
                            onChange={handleTypeChange}
                            error={isEmpty ? "Please choose a value" : false}
                          />
                          <Form.Select
                            fluid
                            required
                            name='experience'
                            label='Experience'
                            value={experience}
                            options={experiences}
                            placeholder='Experience'
                            onChange={handleExperienceChange}
                            error={isEmpty ? "Please choose a value" : false}
                          />
                          <Form.Radio
                            required
                            toggle
                            type='radio'
                            label='Permission'
                            name='permission'
                            value={permission === 'true' ? 'false' : 'true'}
                            checked={permission === 'true'}
                            onChange={handlePermisssionChange}
                          />
                          <Form.Field
                            required
                            control={Input}
                            type='date'
                            name='expires'
                            label='Expiry Date'
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                            error={isEmpty ? "Please pick a date" : false}
                          />
                        </Form>
                        <br/>
                      </Grid.Column>
                    </Grid>
                  </Segment>
                ) : (
                  "Unkown stage, How did you manage to get here?"
                )}
              </Container>
              <br/>
              <div>
                <Button disabled={activeStep === 0} animated onClick={handleBack}>
                  <Button.Content visible>Back</Button.Content>
                  <Button.Content hidden>
                    <Icon name='arrow left' />
                  </Button.Content>
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button primary onClick={handleNext} content='Finish' />
                ) : (
                  <Button primary animated onClick={handleNext}>
                    <Button.Content visible>Next</Button.Content>
                    <Button.Content hidden>
                      <Icon name='arrow right' />
                    </Button.Content>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Paper> */}
      {/* <Segment placeholder>
        <Grid columns={2} stackable textAlign='center'>
          <Divider vertical>Or</Divider>

          <Grid.Row verticalAlign='middle'>
            <Grid.Column>
              <Header icon>
                <Icon name='search' />
                Find a Bounty
              </Header>

              <Search placeholder='Search bounties...'/>
            </Grid.Column>

            <Grid.Column>
              <Header icon>
                <Icon name='world' />
                Create a new Bounty
              </Header>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <Button primary>Create</Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
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
                  placeholder="search"
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
                  ID
                </th>
                <th>
                  Status
                </th>
                <th>
                  Url
                </th>
                <th>
                  Amount
                </th>
                <th>
                  Experience
                </th>
                <th>
                  Commitment
                </th>
                <th>
                  Type
                </th>
                <th>
                  Category
                </th>
                <th>
                  Keywords
                </th>
                <th>
                  Permission
                </th>
                <th>
                  Expires
                </th>
                <th>
                  Issue
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {bountyList.map((bounty, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                     */}{/* <Button tag={Link} to={`${match.url}/${bounty.id}`} color="link" size="sm">
                      {bounty.id}
                    </Button>
                  </td>
                  <td>
                    {bounty.status}
                  </td>
                  <td>{bounty.url}</td>
                  <td>{bounty.amount}</td>
                  <td>
                    {bounty.experience}
                  </td>
                  <td>{bounty.commitment}</td>
                  <td>
                    {bounty.type}
                  </td>
                  <td>
                    {bounty.category}
                  </td>
                  <td>{bounty.keywords}</td>
                  <td>{bounty.permission ? 'true' : 'false'}</td>
                  <td>{bounty.expires ? <TextFormat type="date" value={bounty.expires} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{bounty.issue ? <Link to={`issue/${bounty.issue.id}`}>{bounty.issue.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                       */}{/* <Button tag={Link} to={`${match.url}/${bounty.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          View
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bounty.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          Edit
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bounty.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          Delete
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
              No Bounties found
            </div>
          )
        )}
      </div> */}
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
