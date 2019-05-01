import React from 'react';
import { Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing">
      <Header as="h1" className="landing-header">
        See something? <br /> Report it!
      </Header>
      <Header.Subheader className="landing__subheader">
        <span>
          Say <span className="color-red">NO</span> to corruption
        </span>
        <br />
        <span>Be the voice in your community</span>
      </Header.Subheader>
      <Button as={Link} to="/signup" color="red" content="GET STARTED" />
    </div>
  );
};

export default Landing;
