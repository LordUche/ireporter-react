import React from 'react';
import { Header } from 'semantic-ui-react';

const Landing = () => {
  return (
    <div className="landing">
      <Header as="h1" className="landing__header">
        See something? <br /> Report it!
      </Header>
      <Header.Subheader className="landing__subheader">
        <span>
          Say <span className="color-red">NO</span> to corruption
        </span>
        <br />
        <span>Be the voice in your community</span>
      </Header.Subheader>
    </div>
  );
};

export default Landing;
