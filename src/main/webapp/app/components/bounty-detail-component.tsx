import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import ReactTooltip from 'react-tooltip';

import { Grid, Dropdown, Segment, Header, Container, Label, Statistic, Rating, List, Button, Menu, Input, Ref, Sticky, Popup, Modal, Form, Icon, Divider, Message } from 'semantic-ui-react';
import { createRef } from 'react';
import _ from 'lodash';
import Timer from './bounty-timer';
import { Experience } from 'app/shared/model/enumerations/experience.model';
import { Category } from 'app/shared/model/enumerations/category.model';
import { capitalizeFirst } from 'app/shared/util/string-utils';
import { Status } from 'app/shared/model/enumerations/status.model';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { modeOptions } from 'app/shared/model/bounty.model';
import { createMedia } from '@artsy/fresnel';

export interface IBountyDetailProps extends RouteComponentProps<{ id: string }> {
	bountyEntity: any,
  bountyList: any,
  loading: any,
  fundingUpdating: any,
  isAuthenticated: any,
  account: any,
  getEntity: any,
  getEntities: any,
  getSearchEntities: any,

  addFunds: any,
  removeFunds: any,

  getFunding: any,
  resetFunding: any,
  updateFunding: any,
  createFunding: any,
}

const { MediaContextProvider, Media } = createMedia({
	breakpoints: {
		mobile: 0,
		tablet: 768,
		computer: 1024,
	},
})

const hasExpired = (dateString: string) => (+new Date(dateString) - +new Date() <= 0)

const  options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

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

const bountySlice = (list: any, id: any) => {
	let myBounty
	list.forEach(bounty => {
		if (bounty.id.toString() === id) {
			myBounty = bounty;
		}
	})
	const myIndex = list.indexOf(myBounty);

	if (list.slice(myIndex, myIndex+5).length >= 5) {
		return list.slice(myIndex, myIndex+5);
	} else if (list.slice(myIndex-4, myIndex+1).length >= 5) {
		return list.slice(myIndex-4, myIndex+1);
	} else
	
		if (list.slice(myIndex-2, myIndex+3).length >= 5) {
			return list.slice(myIndex-2, myIndex+3);
		} else if (list.slice(myIndex+2, myIndex-3).length >= 5) {
			return list.slice(myIndex+2, myIndex-3);
		}
		
			else {
				return list;
			}
}

const FundsModalContent = (props: any, id = null) => {
	return (
		<div>
			<Modal.Content>
				<Form onSubmit={props.handleSubmit(props.onSubmit)}>
					<Message
						attached
						header='Add Funds | Edit Funds'
					/>
					<Segment basic attached>
						<Grid>
							<Grid.Column width='4'/>
							<Grid.Column width='8'>
								<Form.Field
									required
									error={props.errors.amount?.message}>
									<label>Amount</label>
									<Controller
										as={Input}
										name="amount"
										placeholder="Amount"
										control={props.control}
										// defaultValue={_.isEmpty(bountyEntity) ? bountyEntity.fundings[0].amount : null}
									/>
									{props.errors.amount && (
										<div className={"ui pointing above prompt label"}>
											{props.errors.amount?.message}
										</div>
									)}
								</Form.Field>
								<Form.Field
									required
									error={props.modeError !== ''}>
									<label>Mode</label>
									<Dropdown
										name="mode"
										selection
										value={props.mode}
										placeholder="Mode"
										options={modeOptions}
										onChange={props.handleModeChange}
										// defaultValue={_.isEmpty(bountyEntity) ? bountyEntity.fundings[0].mode : null}
									/>
									{props.modeError && (
										<div className={"ui pointing above prompt label"}>
											{props.modeError}
										</div>
									)}
								</Form.Field>

								<div>
									<Button color='black' onClick={() => props.setOpen(false)}>
										Cancel
									</Button>
									<Button
										color='teal'
										type="submit"
										disabled={props.fundingUpdating}
									>
										Add funds
									</Button>
								</div>
							</Grid.Column>
							<Grid.Column width='4'/>
						</Grid>
					</Segment>
				</Form>
			</Modal.Content>
		</div>
	);
}

interface IBountyFormInput {
  amount: number;
}

const bountyFormSchema = yup.object().shape({
  amount: yup.number().positive().required(),
});

export interface BountyDetailComponentProps extends IBountyDetailProps {
	open: any, setOpen: any,

	search: any, setSearch: any, startSearching: any,

	handleModeChange: any, handleSubmit: any, onSubmit: any,
	modeError: any, control: any, errors: any, mode: any,
}

export const DesktopBountyDetailComponent = (props: BountyDetailComponentProps) => {
	const { bountyEntity, bountyList, loading, isAuthenticated, account, search, setSearch, startSearching } = props;
  const [activeItem] = useState(props.match.params.id);
  const contextRef = createRef<HTMLElement>()

  return (
    <div>
      <Ref innerRef={contextRef}>
				<Grid centered columns='2'>
				
					<Grid.Column width='4'>
						<Sticky context={contextRef} pushing>
							<Menu vertical>
								{_.isEmpty(bountySlice(bountyList, props.match.params.id)) ? (
									!loading && (
										<Menu.Item>
											<i>No Bounties found</i>
										</Menu.Item>
									)                    
								) : (
									bountySlice(bountyList, props.match.params.id).map((bounty, index) => {
										return (
											<>
												<Popup
													wide='very'
													position='top center'
													mouseEnterDelay={500}
													mouseLeaveDelay={500}
													trigger={
														<Menu.Item
															id={bounty.id?.toString()}
															name={bounty.summary}
															active={activeItem === bounty.id?.toString()}
															as='a' href={`/bounty/${bounty.id}`}
														>
															<Header as='h3'>
																<Header.Content>
																	{`${bounty.summary.slice(0, 15)}...`}
																	<Header.Subheader>{bounty.description !== null ? <i>No description available</i> : bounty.description}</Header.Subheader>
																</Header.Content>
															</Header>
														</Menu.Item>
													}
												>
													<Header as='h3' content={bounty.summary} />
													<p>{bounty.description !== null ? <i>No description available</i> : bounty.description}</p>
													<span><small>Difficulty: <Rating icon='star' rating={getDifficulty(bounty.experience)} maxRating={3} /></small></span>
													<br/>
													<span><small>Category: {bounty.category === Category.FRONT_END && 'Front End' || bounty.category === Category.BACKEND && 'Backend' || bounty.category === Category.THIS && 'This'}</small></span>
												</Popup>
											</>
										)
									})
								)}
								<Menu.Item>
									<Input
										icon='search'
										placeholder='Search bounties...'
										onChange={(e, { value }) => setSearch(value)}
										onKeyPress={startSearching}
										value={search}
									/>
								</Menu.Item>
							</Menu>
						</Sticky>
					</Grid.Column>

          <Grid.Column width={12}>
            <Segment basic>
              <Grid columns={2}>
                <Grid.Column width={11}>
                  <Header as='h1' textAlign='left'>
                    {bountyEntity.summary}
										<Header.Subheader>
											<List bulleted horizontal>
												<List.Item>
													Created by {bountyEntity.createdBy}
												</List.Item>
												<List.Item>
													on {bountyEntity.createdDate === null ? '' : `${new Date(bountyEntity.createdDate).toLocaleDateString('en-US', options)}`}
												</List.Item>
											</List>
										</Header.Subheader>
                  </Header>

                  <Header as='h2'>
                    Description
                  </Header>
                  <p>{bountyEntity.description !== null ? <i>No description available</i> : bountyEntity.description}</p>
									<br/>
									<List size='large'>
                    <List.Item>
                      Difficulty: <Rating icon='star' rating={getDifficulty(bountyEntity.experience)} maxRating={3} />
										</List.Item>
                    <List.Item>Category: {bountyEntity.category === Category.FRONT_END && 'Front End' || bountyEntity.category === Category.BACKEND && 'Backend' || bountyEntity.category === Category.THIS && 'This'}</List.Item>
                    <List.Item>Type: {capitalizeFirst(bountyEntity.type)}</List.Item>
                    <List.Item as='a' href={bountyEntity.issueUrl}>Issue url</List.Item>
                  </List>
                  
                  <Header as='h2'>
                    Expires in:
                  </Header>
                  <Grid>
                    <Grid.Column width={10}>
                      <div>
                        <Timer startDate={(bountyEntity?.expiryDate)} />
                      </div>
                    </Grid.Column>
                  </Grid>
                </Grid.Column>

                <Grid.Column width={5}>
                  {
                    hasExpired(bountyEntity.expiryDate?.toString()) && <Label as='a' color='red' ribbon='right'>Expired</Label>
                    || bountyEntity?.status === Status.CLOSED && <Label as='a' color='red' ribbon='right'>Claimed</Label>
                    || bountyEntity?.status === Status.FUNDED && <Label as='a' color='red' ribbon='right'>Funded</Label>
                  }
                  <Container>
                    <Statistic horizontal>
                      <Statistic.Value>${bountyEntity.amount}</Statistic.Value>
                      <Statistic.Label>Bounty</Statistic.Label>
                    </Statistic>

                    <Header as='h2' textAlign='justified'>Sponsors</Header>

                    <List size='large' ordered divided animated verticalAlign='middle' >
                      {bountyEntity.fundings?.map((funding, index) => {
                        return (
                          <List.Item key={index}>
                            {`${funding.createdBy}: $${funding.amount}`}
                            {isAuthenticated && account.login === bountyEntity.createdBy ? (
                              <List.Content floated='right'>
                                <Icon name='edit' color='teal' />
                                <Icon name='trash' color='red' />
                              </List.Content>
                            ) : (
                              null
                            )}
                          </List.Item>
                        )
                      })}
										</List>										
										{!isAuthenticated && (
											<ReactTooltip id='funds-tooltip' aria-haspopup='true' type='info'>
												<p>You need to signed in to add funds</p>
											</ReactTooltip>
										)}
                    <Modal
                      size={'small'}
                      open={props.open}
                      onOpen={() => props.setOpen(true)}
                      onClose={() => props.setOpen(false)}
                      trigger={
												<Button
													data-tip
													data-for='funds-tooltip'
													color='teal'
													content='Add funds'
													icon='add'
													labelPosition='right'
													disabled={!isAuthenticated}
												/>
                      }
                    >
											<FundsModalContent
												handleModeChange={props.handleModeChange}
												handleSubmit={props.handleSubmit}
												modeError={props.modeError}
												onSubmit={props.onSubmit}
												setOpen={props.setOpen}
												control={props.control}
												errors={props.errors}
												mode={props.mode}
											/>
                    </Modal>

                  </Container>
                </Grid.Column>
              </Grid>
              <br/>
              {isAuthenticated && account.login === bountyEntity.createdBy ? (
                <div>
                  <Divider />
                  <Segment textAlign='center' basic>

                    <Button color='teal'>Edit</Button>
                    <Button negative>Close</Button>
                  </Segment>
                </div>
              ) : (
                null
              )}

            </Segment>
					</Grid.Column>
					
        </Grid>
      </Ref>
    </div>
  );
};

export const MobileBountyDetailComponent = (props: BountyDetailComponentProps) => {
	const { bountyEntity, bountyList, loading, isAuthenticated, account, search, setSearch, startSearching } = props;

	return (
		<div>
			{
				hasExpired(bountyEntity.expiryDate?.toString()) && <Label as='a' color='red' ribbon>Expired</Label>
				|| bountyEntity?.status === Status.CLOSED && <Label as='a' color='red' ribbon>Claimed</Label>
				|| bountyEntity?.status === Status.FUNDED && <Label as='a' color='red' ribbon>Funded</Label>
			}
			<Segment vertical>
				<Grid>
					<Grid.Column width={4}>
						<small>
							<Statistic size='small'>
								<Statistic.Value>${bountyEntity.amount}</Statistic.Value>
								<Statistic.Label>Bounty</Statistic.Label>
							</Statistic>
						</small>
					</Grid.Column>
					<Grid.Column width={2} />
					<Grid.Column width={10}>
						<div>
							<Timer startDate={(bountyEntity?.expiryDate)} />
						</div>
					</Grid.Column>
				</Grid>
				
				<Divider />

				<Header as='h1' textAlign='left'>
					{bountyEntity.summary}
					<Header.Subheader>
						<List bulleted horizontal>
							<List.Item>
								Created by {bountyEntity.createdBy}
							</List.Item>
							<List.Item>
							 	on {bountyEntity.createdDate === null ? '' : `${new Date(bountyEntity.createdDate).toLocaleDateString('en-US', options)}`}
							</List.Item>
						</List>
					</Header.Subheader>
				</Header>

				<h2>
					Description
				</h2>
				<p>{bountyEntity.description !== null ? <i>No description available</i> : bountyEntity.description}</p>
				<br/>
				<br/>
				<Grid columns='2'>
					<Grid.Column>
						<List size='large'>
							<List.Item>
								Difficulty: <Rating icon='star' rating={getDifficulty(bountyEntity.experience)} maxRating={3} />
								</List.Item>
							<List.Item>Category: {bountyEntity.category === Category.FRONT_END && 'Front End' || bountyEntity.category === Category.BACKEND && 'Backend' || bountyEntity.category === Category.THIS && 'This'}</List.Item>
							<List.Item>Type: {capitalizeFirst(bountyEntity.type)}</List.Item>
							<List.Item as='a' href={bountyEntity.issueUrl}>Issue url</List.Item>
						</List>
					</Grid.Column>

					<Grid.Column>
						<Header as='h2'>Sponsors</Header>

						<List size='large' ordered divided animated verticalAlign='middle' >
							{bountyEntity.fundings?.map((funding, index) => {
								return (
									<List.Item key={index}>
										{`${funding.createdBy}: $${funding.amount}`}
										{isAuthenticated && account.login === bountyEntity.createdBy ? (
											<List.Content floated='right'>
												<Icon name='edit' color='teal' />
												<Icon name='trash' color='red' />
											</List.Content>
										) : (
											null
										)}
									</List.Item>
								)
							})}
						</List>

						<Modal
							size={'small'}
							open={props.open}
							onOpen={() => props.setOpen(true)}
							onClose={() => props.setOpen(false)}
							trigger={
								<Button
									color='teal'
									content='Add funds'
									icon='add'
									labelPosition='right'
									disabled={!isAuthenticated}
								/>
							}
						>
							<FundsModalContent
								handleModeChange={props.handleModeChange}
								handleSubmit={props.handleSubmit}
								modeError={props.modeError}
								onSubmit={props.onSubmit}
								setOpen={props.setOpen}
								control={props.control}
								errors={props.errors}
								mode={props.mode}
							/>
						</Modal>
					</Grid.Column>
				</Grid>
						
				<br/>
				{isAuthenticated && account.login === bountyEntity.createdBy ? (
					<div>
						<Divider />
						<Segment textAlign='center' basic>

							<Button color='teal'>Edit</Button>
							<Button negative>Close</Button>
						</Segment>
					</div>
				) : (
					null
				)}

			</Segment>

		</div>
	);

}


export const BountyDetailComponent = (props: IBountyDetailProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
	const [mode, setMode] = useState('');
	const [modeError, setModeError] = useState('');
	const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
	
	const handleModeChange = (e, { value }) => setMode(value);

  useEffect(() => {
    props.getEntity(props.match.params.id);
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

	const { control, errors, handleSubmit } = useForm<IBountyFormInput>({
		resolver: yupResolver(bountyFormSchema)
	});
	
  const onSubmit = (data: IBountyFormInput) => {
		if (mode === '') {
			setModeError('Please select a mode')
		} else{
			const entity = {
				mode,
				amount: data.amount,
			}
			props.createFunding(entity);
			window.location.reload(false)
			setOpen(false);
		}
	};

	const rest = {
		open, setOpen, search,
		setSearch, startSearching,
		handleModeChange, handleSubmit, onSubmit,
		errors, mode, modeError, control,
	}

  return (
    <div>
      <MediaContextProvider>
        <Media greaterThan='mobile'>
          <DesktopBountyDetailComponent {...rest} {...props} />
        </Media>
        <Media at='mobile'>
          <MobileBountyDetailComponent {...rest} {...props} />
        </Media>
      </MediaContextProvider>
    </div>
  );
};


export default BountyDetailComponent;
