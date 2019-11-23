import React from 'react'
import './CircleButton.css'
import PropTypes from 'prop-types';
import { stringify } from 'querystring';

export default function NavCircleButton(props) {
  const { tag, className, children, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

NavCircleButton.defaultProps ={
  tag: 'a',
}

NavCircleButton.propTypes = {
  tag: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};
