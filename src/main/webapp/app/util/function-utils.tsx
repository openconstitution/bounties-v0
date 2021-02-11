
export const displaySingleBounty = (bounty, history) => {
  // eslint-disable-next-line no-console
  console.log('navigate now so')
  history.push({
    pathname: '/bounty',
    state: { bounty }
  })
}