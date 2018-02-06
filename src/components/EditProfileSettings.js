import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const EditProfileSettings = (props) => {
  if (props.isUser) {
    return (
      <Link
        to="settings"
        className="btn btn-sm btn-outline-secondary action-btn"
      >
        <i className="ion-gear-a" /> Edit Profile Settings
      </Link>
    );
  }
  return null;
};

EditProfileSettings.propTypes = {
  isUser: PropTypes.bool.isRequired,
};

export default EditProfileSettings;
