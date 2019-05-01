import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const Profile = () => {
  return (
    <div>
      <Button color="red" as={Link} to="/report" content="REPORT AN INCIDENT" />
    </div>
  );
};

export default Profile;
