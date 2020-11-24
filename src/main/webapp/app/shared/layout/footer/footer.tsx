import './footer.scss';

import React from 'react';
import { Segment, Container, Image, List, Divider } from 'semantic-ui-react';

const Footer = props => (
  <div className="footer">
    <Segment style={{ margin: '0em 0em 5em' }} basic>
      <Container textAlign='center'>
        <Divider section />
        <Image src='/logo.png' centered size='mini' />
        <List horizontal divided link size='small'>
          <List.Item as='a' href='#'>
            Site Map
          </List.Item>
          <List.Item as='a' href='#'>
            Contact Us
          </List.Item>
          <List.Item as='a' href='#'>
            Terms and Conditions
          </List.Item>
          <List.Item as='a' href='#'>
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Segment>
  </div>
);

export default Footer;
