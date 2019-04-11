import React from 'react';
import PropTypes from 'prop-types';

export const Input = (props) => (
  <div className="form-group">
    <input
      className="form-control"
      ref={props.ref}
      id={props.id}
      name={props.name}
      type={props.type}
      value={props.content}
      placeholder={props.placeholder}
      step="any" />
  </div>
);

Input.propTypes = {
  type: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  id:PropTypes.string,
  name: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.string,

  ]),
  placeholder: PropTypes.string,
};
