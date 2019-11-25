import React from 'react'
import './CircleButton.css'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

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
  tag: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
    PropTypes.array,
    PropTypes.instanceOf(Link)
  ]),
  className: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};
