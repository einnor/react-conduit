import React from 'react';
import PropTypes from 'prop-types';

const ListErrors = (props) => {
  const { errors } = props;
  if (errors) {
    return (
      <ul className="error-messages">
        {
          Object.keys(errors).map(key => (
            <li key={key}>
              {key} {errors[key]}
            </li>
            ))
        }
      </ul>
    );
  }
  return null;
};

ListErrors.propTypes = {
  errors: PropTypes.node.isRequired,
};

export default ListErrors;
